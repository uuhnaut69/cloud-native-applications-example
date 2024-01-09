import { HttpResponseTransformInterceptor } from '@app/infrastructure/interceptors/http-response-transform.interceptor';
import { DatabaseModule } from '@app/infrastructure/orm/database.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseTransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
  ],
})
export class InfrastructureModule {}
