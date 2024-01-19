import { BaseApiResponse } from '@app/common/decorators/base-api-response.decorator';
import { SeedService } from '@app/core/seed/seed.service';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller({
  path: '/seed',
  version: '1',
})
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @BaseApiResponse({
    summary: 'Seed products and related data',
    schemaType: 'boolean',
    refType: Boolean,
  })
  @Post('/products')
  public async seedProducts() {
    try {
      await this.seedService.seedProducts();
      return true;
    } catch (error) {
      return false;
    }
  }
}
