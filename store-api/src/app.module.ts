import { CoreModule } from '@app/core/core.module';
import { InfrastructureModule } from '@app/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, CoreModule],
})
export class AppModule {}
