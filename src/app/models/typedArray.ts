import { Transaction } from './transaction';

export interface TypedArray<T extends Transaction> {
    type: 'expense' | 'income' | 'budget';
    data: T[];
}
  