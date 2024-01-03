import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TransactionService } from './transaction.service';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private trans: TransactionService) { }

  // Fetch all expenses
  getAllExpenses(): Observable<any> {
    return this.http.get<any>(`${this.trans.transactionsUrl}/expense/all`)
      .pipe(
        tap(_ => console.log('fetched expenses')),
        catchError(this.trans.handleError<any>('getExpenses', []))
      );
  }

  // // Fetch expense by id 
  // getExoenseById(id: number): Observable<Expense> {
  //   const url = `${this.trans.transactionsUrl}/expense/find/${id}`;
  //   return this.http.get<Recipe>(url).pipe(
  //     tap(_ => console.log(`fetched recipe id=${id}`)),
  //     catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
  //   );
  // }

  // // Fetch expense by id
  // getExpenseById(id: number): Observable<any> {
  //   const url = 
    

}
