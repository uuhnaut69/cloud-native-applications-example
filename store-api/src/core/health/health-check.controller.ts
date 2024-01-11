import { BaseApiResponse } from '@app/common/decorators/base-api-response.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller({
  path: '/health/check',
  version: '1',
})
export class HealthCheckController {
  @BaseApiResponse({
    summary: 'Get service health',
    schemaType: 'string',
    refType: String,
    example: 'Up',
  })
  @Get()
  public getServiceHealth() {
    return 'Up';
  }
}
