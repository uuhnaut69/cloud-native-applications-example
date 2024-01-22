import { createLogger, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import { ecsFormat } from '@elastic/ecs-winston-format';
import { env } from '@app/env';

const instance = createLogger({
  level: env.logLevel,
  format: ecsFormat({
    apmIntegration: true,
    convertErr: true,
    convertReqRes: true,
  }),
  transports: [new transports.Console()],
});

export const logger = WinstonModule.createLogger({
  instance,
});
