import { HealthCheckController } from '@app/core/health/health-check.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [HealthCheckController],
})
export class HealthModule {}
