import { PaginationRequest } from '@app/common/http/models/pagination.request';
import { SortableRequest } from '@app/common/http/models/sortable.request';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductSearchRequest
  implements PaginationRequest, SortableRequest
{
  @ApiPropertyOptional({
    description: 'List of category ids to filter products',
  })
  public categoryIds?: string[];

  @ApiPropertyOptional({
    description: 'Page number',
  })
  public page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
  })
  public limit?: number;

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
