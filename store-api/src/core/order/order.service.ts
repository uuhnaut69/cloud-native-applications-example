import { InventoryService } from '@app/core/inventory/inventory.service';
import { CreateOrderRequest } from '@app/core/order/dtos/create-order.request';
import { Order } from '@app/core/order/models/order.entity';
import { User } from '@app/core/user/models/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderService {
  constructor(
    private readonly inventoryService: InventoryService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  @Transactional()
  public async createNewOrder(
    currentUser: User,
    request: CreateOrderRequest,
  ): Promise<string> {
    const { items } = request;

    const results = await Promise.all(
      items.map((item) =>
        this.inventoryService.decreaseQuantity(item.productId, item.quantity),
      ),
    );

    if (results.some((result) => !result)) {
      throw new BadRequestException('Invalid product quantity');
    }

    const order = this.orderRepository.create({
      user: currentUser,
      orderItems: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    await this.orderRepository.save(order);

    return order.id;
  }
}
