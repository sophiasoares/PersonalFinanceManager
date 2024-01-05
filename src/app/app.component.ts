import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainWidgetComponent } from './components/main-widget/main-widget.component';
import { Expense } from './models/expense';
import { Income } from './models/income';
import { Budget } from './models/budget';
import { TypedArray } from './models/typedArray';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PersonalFinanceManager';
  username: string = 'Sophia';
  expenses: TypedArray<Expense> = { type: 'expense', data: []};
  incomes: TypedArray<Income> = { type: 'income', data: []};
  budgets: TypedArray<Budget> = { type: 'budget', data: []};

  constructor(private tranService: TransactionService) {}

  ngOnInit() {
    this.getExpenses();
    this.getIncomes();
    this.getBudgets();
  }

  getExpenses(): void {
    this.tranService.getAllTransactions('expense').subscribe(expenses => {
      this.expenses = { type: 'expense', data: expenses as Expense[]}; // Reassignment, otherwise the ngOnChanges() in MainWidgetComponent won't be triggered
    });
  }

  getIncomes(): void {
    this.tranService.getAllTransactions('income').subscribe(incomes => { 
      this.incomes = { type: 'income', data: incomes as Income[]};
    });
  }

  getBudgets(): void {
    this.tranService.getAllTransactions('budget').subscribe(budgets => {
      this.budgets = { type: 'budget', data: budgets as Budget[]};
    });
  }

}
