import { InfrastructureModule } from '@app/infrastructure/infrastructure.module';
import { ModulesModule } from '@app/modules/modules.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, ModulesModule],
})
export class AppModule {}
