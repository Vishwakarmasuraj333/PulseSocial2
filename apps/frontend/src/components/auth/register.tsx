'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import Link from 'next/link';
import { Button } from '@gitroom/react/form/button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CreateOrgUserDto } from '@gitroom/nestjs-libraries/dtos/auth/create.org.user.dto';
import { GithubProvider } from '@gitroom/frontend/components/auth/providers/github.provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingComponent } from '@gitroom/frontend/components/layout/loading';
import { GoogleProvider } from '@gitroom/frontend/components/auth/providers/google.provider';
import { AppleProvider } from '@gitroom/frontend/components/auth/providers/apple.provider';
import { OauthProvider } from '@gitroom/frontend/components/auth/providers/oauth.provider';
import { useFireEvents } from '@gitroom/helpers/utils/use.fire.events';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { useTrack } from '@gitroom/react/helpers/use.track';
import { TrackEnum } from '@gitroom/nestjs-libraries/user/track.enum';
import { FarcasterProvider } from '@gitroom/frontend/components/auth/providers/farcaster.provider';
import dynamic from 'next/dynamic';
import { WalletUiProvider } from '@gitroom/frontend/components/auth/providers/placeholder/wallet.ui.provider';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import useCookie from 'react-use-cookie';

const WalletProvider = dynamic(
  () => import('@gitroom/frontend/components/auth/providers/wallet.provider'),
  {
    ssr: false,
    loading: () => <WalletUiProvider />,
  }
);

type Inputs = {
  email: string;
  password: string;
  company: string;
  providerToken: string;
  provider: string;
};

export function Register() {
  const getQuery = useSearchParams();
  const fetch = useFetch();
  const [provider] = useState(getQuery?.get('provider')?.toUpperCase());
  const [code, setCode] = useState(getQuery?.get('code') || '');
  const [state] = useState(getQuery?.get('state') || '');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (provider && code) {
      load();
    }
  }, []);

  const load = useCallback(async () => {
    const { token } = await (
      await fetch(`/auth/oauth/${provider?.toUpperCase() || 'LOCAL'}/exists`, {
        method: 'POST',
        body: JSON.stringify({
          code,
          state,
        }),
      })
    ).json();
    if (token) {
      setCode(token);
      setShow(true);
    }
  }, [provider, code]);

  if (!code && !provider) {
    return <RegisterAfter token="" provider="LOCAL" />;
  }

  if (!show) {
    return <LoadingComponent />;
  }

  return (
    <RegisterAfter token={code} provider={provider?.toUpperCase() || 'LOCAL'} />
  );
}

export function RegisterAfter({
  token,
  provider,
}: {
  token: string;
  provider: string;
}) {
  const t = useT();
  const {
    isGeneral,
    genericOauth,
    neynarClientId,
    appleClientId,
    billingEnabled,
  } = useVariables();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState<'empty' | 'weak' | 'medium' | 'strong'>('empty');
  const [backendOffline, setBackendOffline] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();
  const fireEvents = useFireEvents();
  const track = useTrack();
  const [datafast_visitor_id] = useCookie('datafast_visitor_id');

  const isAfterProvider = useMemo(() => {
    return !!token && !!provider;
  }, [token, provider]);

  const resolver = useMemo(() => {
    return classValidatorResolver(CreateOrgUserDto);
  }, []);

  const form = useForm<Inputs>({
    resolver,
    defaultValues: {
      email: '',
      password: '',
      company: '',
      providerToken: token,
      provider: provider,
    },
  });

  const checkStrength = (pass: string) => {
    if (!pass) return setPasswordStrength('empty');
    if (pass.length < 6) return setPasswordStrength('weak');
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      return setPasswordStrength('strong');
    }
    return setPasswordStrength('medium');
  };

  const handleInstantDemo = (targetUrl: string = '/admin') => {
    setLoading(true);
    if (typeof document !== 'undefined') {
      document.cookie = 'auth=demo_token_pulsesocial_superadmin; path=/; max-age=31536000';
      document.cookie = 'showorg=org_pulse_01; path=/; max-age=31536000';
      document.cookie = 'demo_admin=true; path=/; max-age=31536000';
      localStorage.setItem('demo_admin', 'true');
      localStorage.setItem('auth_email', 'admin@pulsesocial.com');
    }
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 200);
  };

  const fetchData = useFetch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!agreeTerms) {
      setAuthError('Please agree to the Terms of Service and Privacy Policy to create your account.');
      return;
    }

    setLoading(true);
    setBackendOffline(false);
    setAuthError(null);

    try {
      const response = await fetchData('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          datafast_visitor_id,
        }),
      });

      setLoading(false);
      if (response.status === 200) {
        fireEvents('register');
        await track(TrackEnum.CompleteRegistration);
        if (response.headers.get('activate') === 'true') {
          router.push('/auth/activate');
        } else {
          router.push('/auth/login');
        }
      } else {
        const errText = await response.text();
        setAuthError(errText || 'Registration failed. Email may already be in use.');
        form.setError('email', {
          message: errText,
        });
      }
    } catch (e: any) {
      setLoading(false);
      const isFetchErr =
        e?.toString()?.includes('Failed to fetch') ||
        e?.message?.includes('Failed to fetch') ||
        e?.message?.includes('NetworkError');

      if (isFetchErr) {
        setBackendOffline(true);
        setAuthError(
          'Cannot reach the PulseSocial Backend API at http://localhost:3000. You can launch in Instant Demo Mode to test the full platform immediately!'
        );
      } else {
        setAuthError('Registration error: ' + (e?.message || e.toString()));
        form.setError('email', {
          message: e?.message || 'Registration error occurred',
        });
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex-1 flex flex-col w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Navigation Tabs (Sign In / Create Account) */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-6 w-full">
          <Link
            href="/auth/login"
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all flex items-center justify-center gap-1.5"
          >
            <span>🔐</span>
            <span>{t('sign_in', 'Sign In')}</span>
          </Link>
          <button
            type="button"
            className="flex-1 py-2 px-3 text-xs font-bold rounded-lg bg-emerald-500 text-black shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>✨</span>
            <span>{t('sign_up', 'Create Account')}</span>
          </button>
        </div>

        {/* Title Heading */}
        <div className="space-y-1 mb-6">
          <h1 className="text-3xl font-black text-white tracking-tight">
            {t('get_started', 'Start with PulseSocial')}
          </h1>
          <p className="text-xs text-slate-400">
            Create your high-performance workspace to schedule, publish, and automate across 28+ networks.
          </p>
        </div>

        {/* Quick Autofill Sample Bar */}
        <div className="space-y-2 mb-5">
          <button
            type="button"
            onClick={() => {
              form.setValue('company', 'Pulse Media Agency Lab');
              form.setValue('email', 'creator@pulsesocial.com');
              form.setValue('password', 'pulse@pass2026');
              checkStrength('pulse@pass2026');
              setAuthError(null);
              setBackendOffline(false);
            }}
            className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>⚡</span>
            <span>Auto-Fill Sample Agency Workspace</span>
          </button>

          {/* Instant Demo Launch Button */}
          <button
            type="button"
            onClick={() => handleInstantDemo('/admin')}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer border border-emerald-400/30 active:scale-[0.98]"
          >
            <span>🚀</span>
            <span>Instant Preview in SuperAdmin Mode &rarr;</span>
          </button>
        </div>

        {/* Error / Offline Alert Banner */}
        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-base">⚠️</span>
              <p className="flex-1 leading-relaxed">{authError}</p>
            </div>
            {backendOffline && (
              <button
                type="button"
                onClick={() => handleInstantDemo('/admin')}
                className="w-full py-1.5 px-3 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all shadow-md"
              >
                Launch Admin Command Center in Demo Mode
              </button>
            )}
          </div>
        )}

        {/* Social Provider Buttons */}
        {!isAfterProvider && (
          <div className="flex flex-col">
            <div className="text-[12px] font-semibold text-slate-400 mb-2.5">
              {t('continue_with', 'Continue With Social')}
            </div>

            <div className="flex flex-col">
              {!isGeneral ? (
                <GithubProvider />
              ) : (
                <div className="gap-2 flex flex-wrap">
                  {genericOauth ? <OauthProvider /> : <GoogleProvider />}
                  {!!appleClientId && <AppleProvider />}
                  {!!neynarClientId && <FarcasterProvider />}
                  {billingEnabled && <WalletProvider />}
                </div>
              )}
            </div>

            <div className="h-[20px] mb-4 mt-4 relative">
              <div className="absolute w-full h-[1px] bg-slate-800 top-[50%] -translate-y-[50%]" />
              <div className="absolute z-[1] justify-center items-center w-full start-0 -top-[4px] flex">
                <div className="px-3 bg-[#131722] text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {t('or', 'or sign up with email')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="flex flex-col gap-3">
          {/* Company / Workspace Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Workspace / Organization Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-500 text-sm">🏢</span>
              <input
                {...form.register('company', { required: 'Workspace name is required' })}
                type="text"
                placeholder="Pulse Media Global"
                className="w-full bg-[#0b0f17] border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
            {form.formState.errors.company && (
              <span className="text-rose-400 text-[11px]">
                {form.formState.errors.company.message}
              </span>
            )}
          </div>

          {!isAfterProvider && (
            <>
              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Work Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-500 text-sm">📧</span>
                  <input
                    {...form.register('email', { required: 'Email is required' })}
                    type="email"
                    placeholder="creator@pulsesocial.com"
                    className="w-full bg-[#0b0f17] border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
                {form.formState.errors.email && (
                  <span className="text-rose-400 text-[11px]">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field with Eye Toggle & Strength Meter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-500 text-sm">🔒</span>
                  <input
                    {...form.register('password', {
                      required: 'Password is required',
                      onChange: (e) => checkStrength(e.target.value),
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    className="w-full bg-[#0b0f17] border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl py-2.5 pl-9 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-white transition-colors p-1 text-xs"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {passwordStrength !== 'empty' && (
                  <div className="space-y-1 pt-1">
                    <div className="flex gap-1.5 h-1">
                      <div
                        className={`flex-1 rounded-full transition-colors ${
                          passwordStrength === 'weak'
                            ? 'bg-rose-500'
                            : passwordStrength === 'medium'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <div
                        className={`flex-1 rounded-full transition-colors ${
                          passwordStrength === 'medium'
                            ? 'bg-amber-500'
                            : passwordStrength === 'strong'
                            ? 'bg-emerald-500'
                            : 'bg-slate-800'
                        }`}
                      />
                      <div
                        className={`flex-1 rounded-full transition-colors ${
                          passwordStrength === 'strong' ? 'bg-emerald-500' : 'bg-slate-800'
                        }`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Password strength:</span>
                      <span
                        className={`font-semibold capitalize ${
                          passwordStrength === 'weak'
                            ? 'text-rose-400'
                            : passwordStrength === 'medium'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {passwordStrength}
                      </span>
                    </div>
                  </div>
                )}

                {form.formState.errors.password && (
                  <span className="text-rose-400 text-[11px]">
                    {form.formState.errors.password.message}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Terms and Privacy Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer select-none leading-relaxed">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500 mt-0.5"
              />
              <span>
                I agree to the{' '}
                <a href="https://pulsesocial.com/terms" className="text-emerald-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="https://pulsesocial.com/privacy" className="text-emerald-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <Button
              type="submit"
              className="w-full rounded-xl !h-[48px] bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              loading={loading}
            >
              <span>{loading ? 'Creating Workspace...' : t('create_account', 'Create Free Account')}</span>
              {!loading && <span>&rarr;</span>}
            </Button>
          </div>

          {/* Free Trial Badges */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-800/80">
            <span>✓ 14-Day Free Trial</span>
            <span>&bull;</span>
            <span>No Credit Card</span>
            <span>&bull;</span>
            <span>Instant Access</span>
          </div>

          {/* Link back to Sign In */}
          <p className="text-center text-xs text-slate-400 mt-2">
            {t('already_have_an_account', 'Already have an account?')}&nbsp;
            <Link href="/auth/login" className="text-emerald-400 hover:underline font-semibold">
              {t('sign_in', 'Sign In')}
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
