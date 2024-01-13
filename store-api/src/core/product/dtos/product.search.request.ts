import { PaginationSortableRequest } from '@app/common/http/models/pagination.request';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductSearchRequest extends PaginationSortableRequest {
  @ApiPropertyOptional({
    description: 'List of category ids to filter products',
  })
  public categoryIds?: string[];
}
