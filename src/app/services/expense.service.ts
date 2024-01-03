import { Injectable } from '@angular/core';
import { TransactionService } from './transaction.service';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expenses: Expense[] = [];
  currentExpense: Expense = {id: 0, description: '', amount: 0, category: '', date: new Date(), type: 'expense'};
  
  constructor(private trans: TransactionService) { }

  // Fetch all expenses
  getAllExpenses(): Expense[] {
    this.trans.getAllTransactions<Expense>('expenses').subscribe(expenses => {
      this.expenses = expenses;
    });
    return this.expenses;
  }

  // Fetch expense by id
  getExpense(id: number): Expense {
    this.trans.getTransaction<Expense>('expense', id).subscribe(expense => {
      this.currentExpense = expense;
    });
    return this.currentExpense;
  }

  // Add new expense
  addExpense(expense: Expense) {
    this.trans.addTransaction<Expense>('expense', expense).subscribe(() => this.trans.goBack());
  }
  
  // Update expense
  updateExpense(updatedExpense: Expense, id: number) {
    this.trans.updateTransaction<Expense>('expense', id, updatedExpense).subscribe(() => this.trans.goBack());
  }

  // Delete expense
  deleteExpense(id: number) {
    this.trans.deleteTransaction<Expense>('expense', id).subscribe(() => this.trans.goBack());
  }

}
