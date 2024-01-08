import { InfrastructureModule } from '@app/infrastructure/infrastructure.module';
import { ModulesModule } from '@app/modules/modules.module';
import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [InfrastructureModule, ModulesModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
