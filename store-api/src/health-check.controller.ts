import { BaseResponse } from '@app/common/http/base.response';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get('/health/check')
  getServiceHealth(): BaseResponse<string> {
    return BaseResponse.success('Up');
  }
}
