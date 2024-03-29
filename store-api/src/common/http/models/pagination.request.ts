import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationSortableRequest {
  @ApiPropertyOptional({
    description: 'Search query',
  })
  public searchQuery?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    default: 1,
  })
  public pageNo?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
  })
  public pageSize?: number = 10;

  @ApiPropertyOptional({
    description: 'Order field that will be used to sort',
  })
  public orderField?: string;

  @ApiPropertyOptional({
    description: 'Order direction that will be used to sort',
    enum: ['ASC', 'DESC'],
  })
  public orderDirection?: 'ASC' | 'DESC';
}
