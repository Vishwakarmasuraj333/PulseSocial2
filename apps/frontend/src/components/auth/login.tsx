'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import Link from 'next/link';
import { Button } from '@gitroom/react/form/button';
import { useMemo, useState, useEffect } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { LoginUserDto } from '@gitroom/nestjs-libraries/dtos/auth/login.user.dto';
import { GithubProvider } from '@gitroom/frontend/components/auth/providers/github.provider';
import { OauthProvider } from '@gitroom/frontend/components/auth/providers/oauth.provider';
import { GoogleProvider } from '@gitroom/frontend/components/auth/providers/google.provider';
import { AppleProvider } from '@gitroom/frontend/components/auth/providers/apple.provider';
import { useVariables } from '@gitroom/react/helpers/variable.context';
import { FarcasterProvider } from '@gitroom/frontend/components/auth/providers/farcaster.provider';
import WalletProvider from '@gitroom/frontend/components/auth/providers/wallet.provider';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string;
  password: string;
  providerToken: '';
  provider: 'LOCAL';
};

export function Login() {
  const t = useT();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notActivated, setNotActivated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [backendOffline, setBackendOffline] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    isGeneral,
    neynarClientId,
    appleClientId,
    billingEnabled,
    genericOauth,
  } = useVariables();

  const resolver = useMemo(() => {
    return classValidatorResolver(LoginUserDto);
  }, []);

  const form = useForm<Inputs>({
    resolver,
    defaultValues: {
      email: '',
      password: '',
      providerToken: '',
      provider: 'LOCAL',
    },
  });

  useEffect(() => {
    // If remembered email exists, populate it
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('remember_email');
      if (savedEmail) {
        form.setValue('email', savedEmail);
      }
    }
  }, [form]);

  const handleInstantDemoLogin = (targetUrl: string = '/admin') => {
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
    setLoading(true);
    setNotActivated(false);
    setBackendOffline(false);
    setAuthError(null);

    if (rememberMe && typeof window !== 'undefined') {
      localStorage.setItem('remember_email', data.email);
    }

    try {
      const login = await fetchData('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          provider: 'LOCAL',
        }),
      });

      if (login.status === 400) {
        const errorMessage = await login.text();
        if (errorMessage === 'User is not activated') {
          setNotActivated(true);
        } else {
          setAuthError(errorMessage || 'Invalid email or password.');
          form.setError('email', {
            message: errorMessage,
          });
        }
        setLoading(false);
      } else if (login.status === 200) {
        // Success: the customFetch afterRequest handler will process cookies and reload/redirect
        setLoading(false);
      } else {
        setAuthError(`Server error (${login.status}).`);
        setLoading(false);
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
          'Cannot connect to PulseSocial Backend API at http://localhost:3000. You can launch in Instant Demo Admin Mode to test the full platform immediately!'
        );
      } else {
        setAuthError('Login error: ' + (e?.message || e?.toString()));
        form.setError('email', {
          message: e?.message || 'Login error occurred',
        });
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex-1 flex flex-col w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Navigation Tabs (Sign In / Create Account) */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-6 w-full">
          <button
            type="button"
            className="flex-1 py-2 px-3 text-xs font-bold rounded-lg bg-emerald-500 text-black shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>🔐</span>
            <span>{t('sign_in', 'Sign In')}</span>
          </button>
          <Link
            href="/auth"
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all flex items-center justify-center gap-1.5"
          >
            <span>✨</span>
            <span>{t('sign_up', 'Create Account')}</span>
          </Link>
        </div>

        {/* Title Heading */}
        <div className="space-y-1 mb-6">
          <h1 className="text-3xl font-black text-white tracking-tight">
            {t('welcome_back', 'Welcome Back')}
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to your PulseSocial command center to schedule &amp; publish across 28+ channels.
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-0.5">
            <span className="font-medium text-emerald-400 flex items-center gap-1">
              <span>⚡</span> Quick Demo Credentials:
            </span>
            <span className="text-[10px] text-slate-500">Click to auto-fill</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                form.setValue('email', 'admin@pulsesocial.com');
                form.setValue('password', 'admin123456');
                setAuthError(null);
                setBackendOffline(false);
              }}
              className="py-2 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>🛡️</span>
              <span>SuperAdmin</span>
            </button>

            <button
              type="button"
              onClick={() => {
                form.setValue('email', 'creator@pulsesocial.com');
                form.setValue('password', 'pulse@pass2026');
                setAuthError(null);
                setBackendOffline(false);
              }}
              className="py-2 px-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>🚀</span>
              <span>Creator / Agency</span>
            </button>
          </div>

          {/* Instant One-Click Demo Mode CTA */}
          <button
            type="button"
            onClick={() => handleInstantDemoLogin('/admin')}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer border border-emerald-400/30 active:scale-[0.98]"
          >
            <span>⚡</span>
            <span>Instant Launch Demo SuperAdmin Mode &rarr;</span>
          </button>
        </div>

        {/* Backend Offline / Error Banner */}
        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-base">⚠️</span>
              <p className="flex-1 leading-relaxed">{authError}</p>
            </div>
            {backendOffline && (
              <button
                type="button"
                onClick={() => handleInstantDemoLogin('/admin')}
                className="w-full py-1.5 px-3 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all shadow-md"
              >
                Enter Admin Command Center in Demo Mode
              </button>
            )}
          </div>
        )}

        {/* Social Provider Buttons */}
        <div className="flex flex-col">
          <div className="text-[12px] font-semibold text-slate-400 mb-2.5">
            {t('continue_with', 'Continue With Social')}
          </div>

          <div className="flex flex-col">
            {isGeneral && genericOauth ? (
              <OauthProvider />
            ) : !isGeneral ? (
              <GithubProvider />
            ) : (
              <div className="gap-2 flex flex-wrap">
                <GoogleProvider />
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
                {t('or', 'or continue with email')}
              </div>
            </div>
          </div>

          {/* Email & Password Input Fields */}
          <div className="flex flex-col gap-3">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-500 text-sm">📧</span>
                <input
                  {...form.register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="admin@pulsesocial.com"
                  className="w-full bg-[#0b0f17] border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
              {form.formState.errors.email && (
                <span className="text-rose-400 text-[11px]">
                  {form.formState.errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {t('forgot_password', 'Forgot password?')}
                </Link>
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-500 text-sm">🔒</span>
                <input
                  {...form.register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
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
              {form.formState.errors.password && (
                <span className="text-rose-400 text-[11px]">
                  {form.formState.errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Not Activated Warning */}
            {notActivated && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5">
                <p className="text-amber-400 text-xs mb-2">
                  {t(
                    'account_not_activated',
                    'Your account is not activated yet. Please check your email for the activation link.'
                  )}
                </p>
                <Link
                  href="/auth/activate"
                  className="text-amber-400 underline hover:font-bold text-xs"
                >
                  {t('resend_activation_email', 'Resend Activation Email')}
                </Link>
              </div>
            )}

            {/* Primary Submit Button */}
            <div className="mt-2">
              <Button
                type="submit"
                className="w-full rounded-xl !h-[48px] bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                loading={loading}
              >
                <span>{loading ? 'Authenticating...' : t('sign_in_1', 'Sign In to PulseSocial')}</span>
                {!loading && <span>&rarr;</span>}
              </Button>
            </div>

            {/* Trust & Security Footnote */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-800/80">
              <span>🔒 256-Bit TLS Encryption</span>
              <span>&bull;</span>
              <span>SOC-2 Ready</span>
              <span>&bull;</span>
              <span>Multi-Tenant</span>
            </div>

            {/* Sign Up Redirect */}
            <p className="text-center text-xs text-slate-400 mt-2">
              {t('don_t_have_an_account', "Don't have an account?")}&nbsp;
              <Link href="/auth" className="text-emerald-400 hover:underline font-semibold">
                {t('sign_up', 'Create a Free Account')}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
