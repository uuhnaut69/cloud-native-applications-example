/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category } from '@app/core/product/models/category.entity';
import { ProductImage } from '@app/core/product/models/product-image.entity';
import { Product } from '@app/core/product/models/product.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class StoreSeed implements Seeder {
  track?: boolean;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoryRepo = dataSource.getRepository(Category);
    const productImagesRepo = dataSource.getRepository(ProductImage);
    const productRepo = dataSource.getRepository(Product);

    await Promise.all([
      categoryRepo.delete({}),
      productImagesRepo.delete({}),
      productRepo.delete({}),
    ]);

    const categoryNames = new Set<string>();
    const categoryEntities: Category[] = [];

    while (categoryNames.size < 5) {
      const generatedCategoryName = faker.commerce.department();

      if (!categoryNames.has(generatedCategoryName)) {
        categoryNames.add(generatedCategoryName);
        categoryEntities.push(
          categoryRepo.create({
            name: generatedCategoryName,
          }),
        );
      }

      await categoryRepo.save(categoryEntities);
    }

    const productEntities: Product[] = [];

    for (let i = 0; i < 10000; i++) {
      productEntities.push(
        productRepo.create({
          name: `${faker.commerce.productName()}${i}`?.trim(),
          price: +faker.commerce.price(),
          quantity: 100,
          images: [
            {
              imageUrl: faker.image.url(),
            },
            {
              imageUrl: faker.image.url(),
            },
          ],
          categories: [this.randomPick(categoryEntities)],
        }),
      );

      if (productEntities.length === 2000) {
        await productRepo.save(productEntities);
        productEntities.length = 0;
      }
    }
  }

  private randomPick<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }
}
