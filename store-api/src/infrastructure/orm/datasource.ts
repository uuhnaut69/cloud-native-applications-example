import { env } from '@app/env';
import { TypeOrmLogger } from '@app/infrastructure/orm/typeorm.logger';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const databaseOptions: DataSourceOptions = {
  type: 'postgres',
  url: env.database.postgres.url,
  synchronize: true,
  logging: env.isProduction ? ['log', 'warn', 'error'] : 'all',
  logger: new TypeOrmLogger(),
  useUTC: true,
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    compress: true,
  },
  entities: [join(__dirname, '..', '..', 'core', '**', 'models', '*.{ts,js}')],
};

export const dataSource = new DataSource(databaseOptions);
