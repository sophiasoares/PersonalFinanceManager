import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction';
import { Expense } from '../models/expense';
import { Income } from '../models/income';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  transactionsUrl = 'http://localhost:8080';  // URL to web api

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  isExpense(transaction: Transaction): transaction is Expense {
    return transaction.type === 'expense';
  }
  
  isIncome(transaction: Transaction): transaction is Income {
    return transaction.type === 'income';
  }
  
  isBudget(transaction: Transaction): transaction is Budget {
    return transaction.type === 'budget';
  }
  
}
