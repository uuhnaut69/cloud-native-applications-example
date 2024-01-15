import { InventoryService } from '@app/core/inventory/inventory.service';
import { Inventory } from '@app/core/inventory/models/inventory.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
