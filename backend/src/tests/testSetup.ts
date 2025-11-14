import { config } from '@/config';

beforeAll(async () => {
  console.log('Test environment setup');
});

afterAll(async () => {
  console.log('Test environment cleanup');
});

export const mockCredential = {
  idAccount: 1,
  idUser: 1,
};
