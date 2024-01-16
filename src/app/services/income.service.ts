import { Injectable } from '@angular/core';
import { TransactionService } from './transaction.service';
import { Income } from '../models/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  incomes: Income[] = [];
  currentIncome: Income = {id: 0, description: '', amount: 0, source: '', date: new Date(), type: 'income'};
  
  constructor(private trans: TransactionService) { }

  // Fetch all incomes
  getAllIncomes(): Income[] {
    this.trans.getAllTransactions<Income>('incomes').subscribe(incomes => {
      this.incomes = incomes;
    });
    return this.incomes;
  }

  // Fetch income by id
  getIncome(id: number): Income {
    this.trans.getTransaction<Income>('income', id).subscribe(income => {
      this.currentIncome = income;
    });
    return this.currentIncome;
  }

  // Add new income
  addIncome(income: Income) {
    this.trans.addTransaction<Income>('income', income).subscribe(() => this.trans.goBack());
  }
  
  // Update income
  updateIncome(updatedIncome: Income) {
    this.trans.updateTransaction<Income>('income', updatedIncome).subscribe(() => this.trans.goBack());
  }

  // Delete income
  deleteIncome(id: number) {
    this.trans.deleteTransaction<Income>('income', id).subscribe(() => this.trans.goBack());
  }

}

