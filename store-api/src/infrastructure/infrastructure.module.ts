import { DatabaseModule } from '@app/infrastructure/orm/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
})
export class InfrastructureModule {}
