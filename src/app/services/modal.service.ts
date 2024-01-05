import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { Income } from '../models/income';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalOpen: boolean = false;

  constructor() { }

  openModal(transaction: Expense | Income | Budget) {
    // this.transaction = transaction;  
    this.modalOpen = true;    
  }

  closeModal() {
    this.modalOpen = false
  }
}
