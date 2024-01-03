import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { Budget } from '../../models/budget';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-widget.component.html',
  styleUrl: './detail-widget.component.scss'
})
export class DetailWidgetComponent {
  @Input() transaction!: Expense | Income | Budget;
  @Input() showModal = false;
  @Output() onClose = new EventEmitter<boolean>();

  constructor(protected trans: TransactionService) {}

  closeModal() {
    this.showModal = false;
    this.onClose.emit(false);
  }
}
