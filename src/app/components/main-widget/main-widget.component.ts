import { Component, Input } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { Budget } from '../../models/budget';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { TypedArray } from '../../models/typedArray';
import { ItemWidgetComponent } from '../item-widget/item-widget.component';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-main-widget',
  standalone: true,
  imports: [CurrencyPipe, CapitalizePipe, ItemWidgetComponent, CommonModule],
  templateUrl: './main-widget.component.html',
  styleUrl: './main-widget.component.scss'
})
export class MainWidgetComponent {
  @Input() list!: TypedArray<Transaction>;
  totalFromChild: number = 0;
  totalAmount: number = 0;
  
  constructor() {}

  ngOnInit() {

  }

  getTotalFromChild(total: number) {
    this.totalFromChild = total;
  }

  updateTotalAmount(total: number) {
    this.totalAmount += total;
  }

}
