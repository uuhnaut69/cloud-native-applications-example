import 'dotenv/config';

export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  appVersion: process.env.npm_package_version,
  port: process.env.PORT || 3000,
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      name: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
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
