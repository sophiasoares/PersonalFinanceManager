import { Component, Input } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { TypedArray } from '../../models/typedArray';
import { ItemWidgetComponent } from '../item-widget/item-widget.component';
import { Transaction } from '../../models/transaction';
import { SpecificTypePipe } from '../../shared/specific-type.pipe';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-main-widget',
  standalone: true,
  imports: [CurrencyPipe, CapitalizePipe, ItemWidgetComponent, CommonModule, SpecificTypePipe, FormsModule],
  templateUrl: './main-widget.component.html',
  styleUrl: './main-widget.component.scss'
})
export class MainWidgetComponent {
  @Input() list!: TypedArray<Transaction>;
  totalFromChild: number = 0;
  totalAmount: number = 0;
  searchTerm: string = '';
  filteredList: TypedArray<Transaction> = {data: [], type: 'expense'};
  
  constructor(private trans: TransactionService) {}

  ngOnInit() {
    this.filteredList = {...this.list, data: [...this.list.data]}; // deep copy
    this.list.data.forEach((item: Transaction) => {
      this.totalAmount += item.amount;
    });
  }

  getTotalFromChild(total: number) {
    this.totalFromChild = total;
  }

  updateTotalAmount(total: number) {
    this.totalAmount += total;
  }

  applyFilter() {
    this.filteredList.data = this.list.data.filter((transaction: Transaction) => {
      const inDescription = transaction.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const inAmount = transaction.amount.toString().includes(this.searchTerm);
  
      const inCategory = (this.trans.isExpense(transaction) || this.trans.isBudget(transaction)) && 
        transaction.category.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      const inSource = this.trans.isIncome(transaction) && 
        transaction.source.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      const inDate = (this.trans.isExpense(transaction) || this.trans.isIncome(transaction)) && 
        transaction.date.toString().includes(this.searchTerm);
  
      const inStartDate = this.trans.isBudget(transaction) && 
        transaction.startDate.toString().includes(this.searchTerm);
  
      const inEndDate = this.trans.isBudget(transaction) && 
        transaction.endDate.toString().includes(this.searchTerm);
  
      return inDescription || inAmount || inCategory || inSource || inDate || inStartDate || inEndDate;
    });
  }
  

}
