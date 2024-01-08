import { env } from '@app/env';
import { TypeOrmLogger } from '@app/infrastructure/orm/typeorm.logger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        console.log(
          join(
            __dirname,
            '..',
            '..',
            'modules',
            '**',
            '**',
            '*.entity.{ts,js}',
          ),
        );
        return {
          type: 'postgres',
          url: env.database.postgres.url,
          autoLoadEntities: true,
          synchronize: true,
          logging: env.isProduction ? ['log', 'warn', 'error'] : 'all',
          logger: new TypeOrmLogger(),
          useUTC: true,
          namingStrategy: new SnakeNamingStrategy(),
          extra: {
            compress: true,
          },
          entities: [
            join(__dirname, '..', '..', 'modules', '**', 'models', '*.{ts,js}'),
          ],
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
})
export class DatabaseModule {}
