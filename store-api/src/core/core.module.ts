import { AuthModule } from '@app/core/auth/auth.module';
import { HealthModule } from '@app/core/health/health.module';
import { InventoryModule } from '@app/core/inventory/inventory.module';
import { OrderModule } from '@app/core/order/order.module';
import { ProductModule } from '@app/core/product/product.module';
import { UserModule } from '@app/core/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
    InventoryModule,
    HealthModule,
  ],
})
export class CoreModule {}
