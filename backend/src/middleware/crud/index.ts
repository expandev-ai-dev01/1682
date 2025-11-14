import { Request } from 'express';
import { z } from 'zod';
import { ApiError } from '@/middleware/error';

export interface SecurityRule {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

export interface ValidatedRequest {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

export class CrudController {
  private rules: SecurityRule[];

  constructor(rules: SecurityRule[]) {
    this.rules = rules;
  }

  async create(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidatedRequest | undefined, ApiError | undefined]> {
    return this.validate(req, schema, 'CREATE');
  }

  async read(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidatedRequest | undefined, ApiError | undefined]> {
    return this.validate(req, schema, 'READ');
  }

  async update(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidatedRequest | undefined, ApiError | undefined]> {
    return this.validate(req, schema, 'UPDATE');
  }

  async delete(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidatedRequest | undefined, ApiError | undefined]> {
    return this.validate(req, schema, 'DELETE');
  }

  private async validate(
    req: Request,
    schema: z.ZodSchema,
    permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'
  ): Promise<[ValidatedRequest | undefined, ApiError | undefined]> {
    try {
      const params = await schema.parseAsync({
        ...req.params,
        ...req.query,
        ...req.body,
      });

      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [
        {
          credential,
          params,
        },
        undefined,
      ];
    } catch (error: any) {
      const validationError: ApiError = {
        name: 'ValidationError',
        message: 'Validation failed',
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        details: error.errors,
      };
      return [undefined, validationError];
    }
  }
}

export const successResponse = <T>(data: T) => ({
  success: true,
  data,
  timestamp: new Date().toISOString(),
});

export const errorResponse = (message: string, details?: any) => ({
  success: false,
  error: {
    message,
    details,
  },
  timestamp: new Date().toISOString(),
});
