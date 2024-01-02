import { Transaction } from './transaction';

export interface Budget extends Transaction {
    category: string;
    startDate: Date;
    endDate: Date;
}