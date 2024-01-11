import { AuthModule } from '@app/core/auth/auth.module';
import { HealthModule } from '@app/core/health/health.module';
import { ProductModule } from '@app/core/product/product.module';
import { UserModule } from '@app/core/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UserModule, ProductModule, HealthModule],
})
export class CoreModule {}
