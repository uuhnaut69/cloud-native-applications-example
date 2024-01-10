import { Pagination } from '@app/common/decorators/pagination.decorator';
import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

type SchemaType = 'object' | 'array' | 'string' | 'number' | 'boolean';

type ApiResponseOptions<DTO extends Type<unknown>> = {
  status?: HttpStatus;
  summary?: string;
  security?: boolean;
  schemaType?: SchemaType;
  pagination?: boolean;
  // DTO class
  refType: DTO;
  example?: any;
};

export const BaseApiResponse = <DTO extends Type<unknown>>(
  options?: ApiResponseOptions<DTO>,
) => {
  const decorators = [];

  if (options?.refType) {
    decorators.push(ApiExtraModels(options?.refType));
  }

  if (options?.security) {
    decorators.push(ApiBearerAuth());
  }

  if (options?.summary) {
    decorators.push(ApiOperation({ summary: options?.summary }));
  }

  if (options?.security) {
    decorators.push(
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
      ApiForbiddenResponse({ description: 'Forbidden' }),
    );
  }

  if (options?.pagination) {
    decorators.push(Pagination());
  }

  decorators.push(
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error' }),
    ApiResponse({
      status: options?.status || HttpStatus.OK,
      schema: {
        properties: {
          success: {
            type: 'boolean',
          },
          data: {
            ...(options?.schemaType === 'array'
              ? {
                  type: 'array',
                  ...(options?.refType
                    ? {
                        items: {
                          $ref: getSchemaPath(options?.refType),
                        },
                      }
                    : {
                        default: [],
                      }),
                }
              : {
                  type: options?.schemaType ?? 'object',
                  ...(options?.schemaType === 'object' && options?.refType
                    ? {
                        $ref: getSchemaPath(options?.refType),
                      }
                    : {
                        default: null,
                      }),
                }),
            ...(options?.example && { example: options?.example }),
          },
          ...(options?.pagination && {
            pagination: {
              type: 'object',
              properties: {
                totalItems: {
                  type: 'number',
                  example: 1,
                },
                totalPages: {
                  type: 'number',
                  example: 1,
                },
                pageNo: {
                  type: 'number',
                  example: 1,
                },
                pageSize: {
                  type: 'number',
                  example: 10,
                },
              },
            },
          }),
          errors: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
        },
      },
    }),
  );

  return applyDecorators(...decorators);
};
