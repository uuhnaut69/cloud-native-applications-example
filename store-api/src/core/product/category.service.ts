import { CategoryResponse } from '@app/core/product/dtos/category.response';
import { Category } from '@app/core/product/models/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async findAllCategories(): Promise<CategoryResponse[]> {
    const categories = await this.categoryRepository.find({
      order: {
        name: 'ASC',
      },
    });
    return categories.map((category) => new CategoryResponse(category));
  }
}
