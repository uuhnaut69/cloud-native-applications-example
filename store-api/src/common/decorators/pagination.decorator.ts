import { SetMetadata } from '@nestjs/common';

export const IS_PAGINATION = 'isPagination';
export const Pagination = () => SetMetadata(IS_PAGINATION, true);
