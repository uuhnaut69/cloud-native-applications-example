import { PaginationSortableRequest } from '@app/common/http/models/pagination.request';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductSearchRequest implements PaginationSortableRequest {
  @ApiPropertyOptional({
    description: 'List of category ids to filter products',
  })
  public categoryIds?: string[];

  @ApiPropertyOptional({
    description: 'Page number',
  })
  public pageNo?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
  })
  public pageSize?: number;

  @ApiPropertyOptional({
    description: 'Order field that will be used to sort products',
  })
  public orderField?: string;

  @ApiPropertyOptional({
    description: 'Order direction that will be used to sort products',
    example: 'ASC',
  })
  public orderDirection?: 'ASC' | 'DESC';
}
