import { BaseApiResponse } from '@app/common/decorators/base-api-response.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller({
  path: '/health/check',
  version: '1',
})
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @BaseApiResponse({
    summary: 'Get service health',
    schemaType: 'string',
    refType: String,
    example: 'ok',
  })
  @Get()
  public async getServiceHealth() {
    const results = await this.healthCheckService.check([
      () => this.db.pingCheck('database'),
    ]);

    return results.status?.toUpperCase();
  }
}
