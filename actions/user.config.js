export const ironOptions = {
  cookieName: 'access_token',
  password: `${process.env.NEXT_PUBLIC_Log_PASS}`,
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
  },
};
