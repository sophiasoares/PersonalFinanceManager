import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { Budget } from '../../models/budget';
import { TransactionService } from '../../services/transaction.service';
import { DetailWidgetComponent } from '../detail-widget/detail-widget.component';

@Component({
  selector: 'app-item-widget',
  standalone: true,
  imports: [CommonModule, DetailWidgetComponent],
  templateUrl: './item-widget.component.html',
  styleUrl: './item-widget.component.scss'
})
export class ItemWidgetComponent {
  @Input() transaction!: Expense | Income | Budget;
  @Output() onTotalChanged = new EventEmitter<number>();
  total: number = 0;
  showModal = false;
  thisModalOpen = false; // Tracks if the model of this transaction is open

  constructor(protected trans: TransactionService) {}
 
  ngOnInit() {
    this.total = this.transaction.amount;
    //this.onTotalChanged.emit(this.total); 
  }

  openModal(transaction: Expense | Income | Budget) {
    if (!this.thisModalOpen) {
      this.transaction = transaction;
      //this.trans.modalOpen = true;
      this.showModal = true;
      this.thisModalOpen = true;
    }
  }

  closeModal(bool: boolean) {
    this.showModal = bool;
    //this.trans.modalOpen = false;
    this.thisModalOpen = false;
  }

}
