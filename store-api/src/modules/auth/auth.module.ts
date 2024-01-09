import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthService } from '@app/modules/auth/auth.service';
import { AccessTokenGuard } from '@app/modules/auth/guards/access-token.guard';
import { AccessTokenStrategy } from '@app/modules/auth/strategies/access-token.strategy';
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
  providers: [AuthService, AccessTokenStrategy, AccessTokenGuard],
  controllers: [AuthController],
})
export class AuthModule {}
