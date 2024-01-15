import { HealthCheckController } from '@app/core/health/health-check.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
})
export class HealthModule {}
