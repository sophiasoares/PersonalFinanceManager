import { Component, Input } from '@angular/core';
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
  @Input() transaction!: Transaction;
}
