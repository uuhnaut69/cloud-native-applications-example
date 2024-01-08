import { AuthModule } from '@app/modules/auth/auth.module';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, UserModule],
})
export class ModulesModule {}
