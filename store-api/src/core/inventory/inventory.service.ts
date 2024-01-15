import { Inventory } from '@app/core/inventory/models/inventory.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  public async decreaseQuantity(
    productId: string,
    quantity: number,
  ): Promise<boolean> {
    const updatedResults = await this.inventoryRepository
      .createQueryBuilder()
      .update(Inventory)
      .set({ quantity: () => 'quantity - :quantity' })
      .where('product_id = :productId', { productId })
      .andWhere('quantity - :quantity >= 0')
      .setParameter('quantity', quantity)
      .execute();
    return !!updatedResults.affected;
  }
}
