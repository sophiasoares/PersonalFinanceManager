import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  constructor(private http: HttpClient) { }

  // Fetch all transactions
  getAllTransactions<T extends Transaction>(type: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.transactionsUrl}/${type}/all`)
      .pipe(
        tap(_ => console.log('fetched' + type + 's')),
        catchError(this.handleError<T[]>('get-'+ type + 's', []))
      );
  }

  // Fetch transaction by id
  getTransaction<T extends Transaction>(type: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.transactionsUrl}/${type}/${id}`)
      .pipe(
        tap(_ => console.log('fetched' + type)),
        catchError(this.handleError<T>('get-'+ type))
      );
  }

  // Add new transaction
  addTransaction<T extends Transaction>(type: string, transaction: T): Observable<T> {
    return this.http.post<T>(`${this.transactionsUrl}/${type}/add`, transaction, this.httpOptions)
      .pipe(
        tap((newTransaction: T) => console.log('added' + type)),
        catchError(this.handleError<T>('add-'+ type))
      );
  }

  // Update transaction
  updateTransaction<T extends Transaction>(type: string, id: number, transaction: T): Observable<any> {
    return this.http.put(`${this.transactionsUrl}/${type}/${id}`, transaction, this.httpOptions)
      .pipe(
        tap(_ => console.log('updated' + type)),
        catchError(this.handleError<any>('update-'+ type))
      );
  }

  // Delete transaction
  deleteTransaction<T extends Transaction>(type: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.transactionsUrl}/${type}/${id}`, this.httpOptions)
      .pipe(
        tap(_ => console.log('deleted' + type)),
        catchError(this.handleError<T>('delete-'+ type))
      );
  }

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

  goBack(): void {
    window.history.back();
  }
  
}
