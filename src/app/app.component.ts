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
  expenses: TypedArray<Expense> = { type: 'expense', data: [
    { id: 1, description: 'Rent', amount: 760, category: 'Housing', date: new Date(), type: 'expense'}, 
    { id: 2, description: 'Groceries', amount: 57.85, category: 'Food', date: new Date(), type: 'expense'},
    { id: 3, description: 'Gas', amount: 30.80, category: 'Transportation', date: new Date(), type: 'expense'},
    { id: 4, description: 'Phone', amount: 40.75, category: 'Utilities', date: new Date(), type: 'expense'},
    { id: 5, description: 'Internet', amount: 53.99, category: 'Utilities', date: new Date(), type: 'expense'},
    { id: 6, description: 'Electricity', amount: 30, category: 'Utilities', date: new Date(), type: 'expense'},
    { id: 7, description: 'Water', amount: 20.34, category: 'Utilities', date: new Date(), type: 'expense'},
    { id: 8, description: 'Student Loan', amount: 100, category: 'Debt', date: new Date(), type: 'expense'},
    { id: 9, description: 'Credit Card', amount: 567.89, category: 'Debt', date: new Date(), type: 'expense'},
    { id: 10, description: 'Car Payment', amount: 205.60, category: 'Debt', date: new Date(), type: 'expense'},
  ]};
  incomes: TypedArray<Income> = { type: 'income', data: [
    { id: 1, description: 'Paycheck', amount: 4500, source: 'Work', date: new Date(), type: 'income'}, 
    { id: 2, description: 'Side Hustle', amount: 1020, source: 'Freelance', date: new Date(), type: 'income'},
    { id: 3, description: 'Gift', amount: 100, source: 'Family', date: new Date(), type: 'income'},
    { id: 4, description: 'Tax Refund', amount: 545.67, source: 'Government', date: new Date(), type: 'income'},
    { id: 5, description: 'Bonus', amount: 1000, source: 'Work', date: new Date(), type: 'income'},
    { id: 6, description: 'Investment', amount: 212.34, source: 'Investment', date: new Date(), type: 'income'},
    { id: 7, description: 'Interest', amount: 57.90, source: 'Investment', date: new Date(), type: 'income'},
    { id: 8, description: 'Gift', amount: 180, source: 'Family', date: new Date(), type: 'income'},
    { id: 9, description: 'Paycheck', amount: 4500, source: 'Work', date: new Date(), type: 'income'},
    { id: 10, description: 'Side Hustle', amount: 920.80, source: 'Freelance', date: new Date(), type: 'income'},
  ]};
  budgets: TypedArray<Budget> = { type: 'budget', data: [
    { id: 1, description: 'Vacation', amount: 650, category: 'Travel', startDate: new Date(), endDate: new Date(), type: 'budget'}, 
    { id: 2, description: 'New Car', amount: 10000, category: 'Transportation', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 3, description: 'New House', amount: 50000, category: 'Housing', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 4, description: 'New Phone', amount: 980, category: 'Utilities', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 5, description: 'New Computer', amount: 2400, category: 'Utilities', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 6, description: 'New TV', amount: 500, category: 'Utilities', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 7, description: 'New Furniture', amount: 1000, category: 'Utilities', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 8, description: 'New Clothes', amount: 560, category: 'Clothing', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 9, description: 'New Shoes', amount: 200, category: 'Clothing', startDate: new Date(), endDate: new Date(), type: 'budget'},
    { id: 10, description: 'New Telephone', amount: 570, category: 'Utilities', startDate: new Date(), endDate: new Date(), type: 'budget'},
  ]};
}
