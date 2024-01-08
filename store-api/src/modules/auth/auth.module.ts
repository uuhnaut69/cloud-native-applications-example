import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthService } from '@app/modules/auth/auth.service';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
