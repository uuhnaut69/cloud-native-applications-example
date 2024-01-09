import { BaseResponse } from '@app/common/http/models/base.response';
import { BaseApiResponse } from '@app/common/http/swagger/base-api-response.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class HealthCheckController {
  @BaseApiResponse({
    summary: 'Get service health',
    schemaType: 'string',
    refType: String,
    example: 'Up',
  })
  @Get('/health/check')
  getServiceHealth(): BaseResponse<string> {
    return BaseResponse.success('Up');
  }
}
