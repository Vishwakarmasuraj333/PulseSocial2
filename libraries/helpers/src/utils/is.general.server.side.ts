export const APP_NAME = 'PulseSocial';
export const COMPANY_NAME = 'Pulse Media Global';
export const LEAD_DEVELOPER = 'Suraj Vishwakarma';

export const isGeneralServerSide = () => {
  return !!process.env.IS_GENERAL;
};

export const getAppName = () => {
  return process.env.NEXT_PUBLIC_APP_NAME || APP_NAME;
};
