import { BaseApiResponse } from '@app/common/decorators/base-api-response.decorator';
import { CurrentUser } from '@app/core/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from '@app/core/auth/guards/access-token.guard';
import { CreateOrderRequest } from '@app/core/order/dtos/create-order.request';
import { OrderService } from '@app/core/order/order.service';
import { User } from '@app/core/user/models/user.entity';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller({
  path: 'order',
  version: '1',
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @BaseApiResponse({
    status: HttpStatus.CREATED,
    summary: 'Create new order',
    security: true,
    schemaType: 'string',
    refType: String,
    example: 'ae35418e-41be-4738-a2ec-50fcd8b9569d',
  })
  @UseGuards(AccessTokenGuard)
  @Post('/create-new-order')
  public async createNewOrder(
    @CurrentUser() currentUser: User,
    @Body() request: CreateOrderRequest,
  ) {
    return await this.orderService.createNewOrder(currentUser, request);
  }
}
