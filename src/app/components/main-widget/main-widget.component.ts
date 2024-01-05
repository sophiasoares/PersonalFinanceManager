import { Component, Input, SimpleChanges } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { TypedArray } from '../../models/typedArray';
import { ItemWidgetComponent } from '../item-widget/item-widget.component';
import { Transaction } from '../../models/transaction';
import { SpecificTypePipe } from '../../shared/specific-type.pipe';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { DetailWidgetComponent } from '../detail-widget/detail-widget.component';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { Budget } from '../../models/budget';

@Component({
  selector: 'app-main-widget',
  standalone: true,
  imports: [CurrencyPipe, CapitalizePipe, ItemWidgetComponent, CommonModule, SpecificTypePipe, FormsModule, DetailWidgetComponent],
  templateUrl: './main-widget.component.html',
  styleUrl: './main-widget.component.scss'
})
export class MainWidgetComponent {
  @Input() list!: TypedArray<Expense | Income | Budget>;
  @Input() widgetType!: string;
  totalFromChild: number = 0;
  totalAmount: number = 0;
  searchTerm: string = '';
  filteredList: TypedArray<Expense | Income | Budget> = {data: [], type: 'expense'};
  showModal = false;
  newTransaction: Expense | Income | Budget = {id: 0, description: '', amount: 0, date: new Date(), startDate: new Date(), endDate: new Date(), category: '', source: '', type: 'expense'};

  constructor(private trans: TransactionService) {}

  ngOnInit() {
    this.newTransaction.type = this.widgetType;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['list'] && changes['list'].currentValue) {
      this.filteredList = {...this.list, data: [...this.list.data]}; // deep copy
      this.list.data.forEach((item: Transaction) => {
        this.totalAmount += item.amount;
      });
    }
  }

  getTotalFromChild(total: number) {
    this.totalFromChild = total;
  }

  updateTotalAmount(total: number) {
    this.totalAmount += total;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal(bool: boolean) {
    this.showModal = bool;
  }

  applyFilter() {
    this.filteredList.data = this.list.data.filter((transaction: Expense | Income | Budget) => {
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
