import { BaseResponse } from '@app/common/http/models/base.response';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class HealthCheckController {
  @ApiOperation({ summary: 'Get service health' })
  @Get('/health/check')
  getServiceHealth(): BaseResponse<string> {
    return BaseResponse.success('Up');
  }
}
