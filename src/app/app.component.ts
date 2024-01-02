import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainWidgetComponent } from './components/main-widget/main-widget.component';
import { Expense } from './models/expense';
import { Income } from './models/income';
import { Budget } from './models/budget';
import { TypedArray } from './models/typedArray';

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
  expenses: TypedArray<Expense> = { type: 'expense', data: [{ id: 1, description: 'Rent', amount: 100, category: 'Housing', date: new Date()}, { id: 2, description: 'Groceries', amount: 50, category: 'Food', date: new Date()}]};
  incomes: TypedArray<Income> = { type: 'income', data: [{ id: 1, description: 'Paycheck', amount: 4500, source: 'Work', date: new Date()}, { id: 2, description: 'Side Hustle', amount: 1020, source: 'Freelance', date: new Date()}]};
  budgets: TypedArray<Budget> = { type: 'budget', data: [{ id: 1, description: 'Vacation', amount: 500, category: 'Travel', startDate: new Date(), endDate: new Date()}, { id: 2, description: 'New Car', amount: 10000, category: 'Transportation', startDate: new Date(), endDate: new Date()}]};
}
