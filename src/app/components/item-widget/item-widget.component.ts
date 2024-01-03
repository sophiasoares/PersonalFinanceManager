import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { Budget } from '../../models/budget';

@Component({
  selector: 'app-item-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-widget.component.html',
  styleUrl: './item-widget.component.scss'
})
export class ItemWidgetComponent {
  @Input() transaction!: Expense | Income | Budget;
  @Output() onTotalChanged = new EventEmitter<number>();
  total: number = 0;

  constructor() {}

  ngOnInit() {
    this.total = this.transaction.amount;
    this.onTotalChanged.emit(this.total);
  }

  isExpense(transaction: any): transaction is Expense {
    return transaction.type === 'expense';
  }

  isBudget(transaction: any): transaction is Budget {
    return transaction.type === 'budget';
  }

  isIncome(transaction: any): transaction is Income {
    return transaction.type === 'income';
  }
}
