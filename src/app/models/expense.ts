import { Transaction } from './transaction';

export interface Expense extends Transaction {
    category: string;
    date: Date;
}