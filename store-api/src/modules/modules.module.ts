import { AuthModule } from '@app/modules/auth/auth.module';
import { ProductModule } from '@app/modules/product/product.module';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UserModule, ProductModule],
})
export class ModulesModule {}
