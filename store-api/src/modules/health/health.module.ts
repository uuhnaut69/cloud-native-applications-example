import { HealthCheckController } from '@app/modules/health/health-check.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [HealthCheckController],
})
export class HealthModule {}
