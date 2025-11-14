import sql from 'mssql';
import { config } from '@/config';

export enum ExpectedReturn {
  Single = 'single',
  Multi = 'multi',
  None = 'none',
}

export interface IRecordSet<T = any> {
  recordset: T[];
}

let pool: sql.ConnectionPool | null = null;

export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (!pool) {
    pool = await sql.connect(config.database);
  }
  return pool;
};

export const dbRequest = async (
  routine: string,
  parameters: { [key: string]: any },
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> => {
  try {
    const currentPool = await getPool();
    const request = transaction ? new sql.Request(transaction) : new sql.Request(currentPool);

    Object.keys(parameters).forEach((key) => {
      request.input(key, parameters[key]);
    });

    const result = await request.execute(routine);

    if (expectedReturn === ExpectedReturn.None) {
      return null;
    }

    if (expectedReturn === ExpectedReturn.Single) {
      return result.recordset[0];
    }

    if (expectedReturn === ExpectedReturn.Multi) {
      if (resultSetNames && resultSetNames.length > 0) {
        const namedResults: { [key: string]: any[] } = {};
        resultSetNames.forEach((name, index) => {
          namedResults[name] = result.recordsets[index] || [];
        });
        return namedResults;
      }
      return result.recordsets;
    }

    return result.recordset;
  } catch (error: any) {
    console.error('Database request error:', {
      routine,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

export const beginTransaction = async (): Promise<sql.Transaction> => {
  const currentPool = await getPool();
  const transaction = new sql.Transaction(currentPool);
  await transaction.begin();
  return transaction;
};

export const commitTransaction = async (transaction: sql.Transaction): Promise<void> => {
  await transaction.commit();
};

export const rollbackTransaction = async (transaction: sql.Transaction): Promise<void> => {
  await transaction.rollback();
};
