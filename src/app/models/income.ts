import { Transaction } from './transaction';

export interface Income extends Transaction {
    source: string;
    date: Date;
}