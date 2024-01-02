import { Component, Input } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { Budget } from '../../models/budget';
import { CurrencyPipe } from '@angular/common';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { TypedArray } from '../../models/typedArray';

@Component({
  selector: 'app-main-widget',
  standalone: true,
  imports: [CurrencyPipe, CapitalizePipe],
  templateUrl: './main-widget.component.html',
  styleUrl: './main-widget.component.scss'
})
export class MainWidgetComponent {
  @Input() data!: TypedArray<Expense> | TypedArray<Income> | TypedArray<Budget>;
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
