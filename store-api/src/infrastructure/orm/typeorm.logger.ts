import { Logger as NestLogger } from '@nestjs/common';
import { Logger } from 'typeorm';

export class TypeOrmLogger implements Logger {
  logQuery(query: string, parameters?: any[]) {
    NestLogger.debug(`[Query]: ${query}`, 'TypeORM');
    if (parameters && parameters.length > 0) {
      NestLogger.debug(
        `[Parameters]: ${JSON.stringify(parameters)}`,
        'TypeORM',
      );
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    NestLogger.error(
      `[Query Error]: ${error}`,
      error instanceof Error ? error?.stack : error,
      'TypeORM',
    );
    NestLogger.debug(`[Query]: ${query}`, 'TypeORM');
    if (parameters && parameters.length > 0) {
      NestLogger.debug(
        `[Parameters]: ${JSON.stringify(parameters)}`,
        'TypeORM',
      );
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    NestLogger.warn(`[Slow Query]: ${query} (${time} ms)`, 'TypeORM');
    if (parameters && parameters.length > 0) {
      NestLogger.warn(`[Parameters]: ${JSON.stringify(parameters)}`, 'TypeORM');
    }
  }

  logSchemaBuild(message: string) {
    NestLogger.debug(`[Schema Build]: ${message}`, 'TypeORM');
  }

  logMigration(message: string) {
    NestLogger.log(`[Migration]: ${message}`, 'TypeORM');
  }

  log(level: 'warn' | 'info' | 'log', message: any) {
    switch (level) {
      case 'warn':
        NestLogger.warn(`[TypeORM]: ${message}`, 'TypeORM');
        break;
      case 'info':
        NestLogger.log(`[TypeORM]: ${message}`, 'TypeORM');
        break;
      case 'log':
        NestLogger.log(`[TypeORM]: ${message}`, 'TypeORM');
        break;
      default:
        break;
    }
  }
}
