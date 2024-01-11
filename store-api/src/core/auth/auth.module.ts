import { AuthController } from '@app/core/auth/auth.controller';
import { AuthService } from '@app/core/auth/auth.service';
import { AccessTokenGuard } from '@app/core/auth/guards/access-token.guard';
import { AccessTokenStrategy } from '@app/core/auth/strategies/access-token.strategy';
import { UserModule } from '@app/core/user/user.module';
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
