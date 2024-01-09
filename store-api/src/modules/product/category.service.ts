import { Category } from '@app/modules/product/models/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }
}
