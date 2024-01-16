import { Injectable } from '@angular/core';
import { TransactionService } from './transaction.service';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgets: Budget[] = [];
  currentBudget: Budget = {id: 0, description: '', amount: 0, category: '', startDate: new Date(), endDate: new Date(), type: 'budget'};
  
  constructor(private trans: TransactionService) { }

  // Fetch all budgets
  getAllBudgets(): Budget[] {
    this.trans.getAllTransactions<Budget>('budgets').subscribe(budgets => {
      this.budgets = budgets;
    });
    return this.budgets;
  }

  // Fetch budget by id
  getBudget(id: number): Budget {
    this.trans.getTransaction<Budget>('budget', id).subscribe(budget => {
      this.currentBudget = budget;
    });
    return this.currentBudget;
  }

  // Add new budget
  addBudget(budget: Budget) {
    this.trans.addTransaction<Budget>('budget', budget).subscribe(() => this.trans.goBack());
  }
  
  // Update budget
  updateBudget(updatedBudget: Budget) {
    this.trans.updateTransaction<Budget>('budget', updatedBudget).subscribe(() => this.trans.goBack());
  }

  // Delete budget
  deleteBudget(id: number) {
    this.trans.deleteTransaction<Budget>('budget', id).subscribe(() => this.trans.goBack());
  }

}
