import 'dotenv/config';

export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  appVersion: process.env.npm_package_version,
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: process.env.PORT || 3000,
  database: {
    postgres: {
      url: process.env.POSTGRES_URL,
    },
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
  },
};
