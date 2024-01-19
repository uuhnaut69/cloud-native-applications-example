import { env } from '@app/env';
import { TypeOrmLogger } from '@app/infrastructure/orm/typeorm.logger';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const databaseOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.database.postgres.host,
  port: env.database.postgres.port,
  database: env.database.postgres.name,
  username: env.database.postgres.username,
  password: env.database.postgres.password,
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
