import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private trans: TransactionService) { }

    // Fetch all budgets
    getAllBudgets(): Observable<any> {
      return this.http.get<any>(`${this.trans.transactionsUrl}/budget/all`)
        .pipe(
          tap(_ => console.log('fetched budgets')),
          catchError(this.trans.handleError<any>('getBudgets', []))
        );
    }

}
