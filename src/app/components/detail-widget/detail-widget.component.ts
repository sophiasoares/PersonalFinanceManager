import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { Income } from '../../models/income';
import { Budget } from '../../models/budget';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { CategoryEnum } from '../../models/enums';
import { SourceEnum } from '../../models/enums';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-detail-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CapitalizePipe],
  templateUrl: './detail-widget.component.html',
  styleUrl: './detail-widget.component.scss'
})
export class DetailWidgetComponent implements OnInit {
  transactionForm: FormGroup = new FormGroup({});
  @Input() transaction!: Expense | Income | Budget;
  @Input() showModal = false;
  @Input() isAdd: boolean = false; // Tracks if the transaction is being added or edited
  @Output() onClose = new EventEmitter<boolean>();
  categories: string[] = [];
  sources: string[] = [];
  selectedOption: string = '';
  selectedDate: string = '';
  selectedEndDate: string = '';
  description: string = '';
  amount: number = 0;

  constructor(
    protected trans: TransactionService, 
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private budgetService: BudgetService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.categories = Object.values(CategoryEnum);
    this.sources = Object.values(SourceEnum);
    
    this.transactionForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      date: [''],
      startDate: [''],
      endDate: [''],
      category: [''],
      source: [''],
    });

    this.transactionForm.get('type')?.valueChanges.subscribe((type) => {
      if (type === 'expense') {
        this.transactionForm.get('date')?.setValidators([Validators.required]);
        this.transactionForm.get('category')?.setValidators([Validators.required]);
        this.transactionForm.get('source')?.clearValidators();
        this.transactionForm.get('startDate')?.clearValidators();
        this.transactionForm.get('endDate')?.clearValidators();
      } else if (type === 'income') {
        this.transactionForm.get('date')?.setValidators([Validators.required]);
        this.transactionForm.get('source')?.setValidators([Validators.required]);
        this.transactionForm.get('startDate')?.clearValidators();
        this.transactionForm.get('endDate')?.clearValidators();
        this.transactionForm.get('category')?.clearValidators();
      } else if (type === 'budget') {
        this.transactionForm.get('startDate')?.setValidators([Validators.required]);
        this.transactionForm.get('endDate')?.setValidators([Validators.required]);
        this.transactionForm.get('category')?.setValidators([Validators.required]);
        this.transactionForm.get('source')?.clearValidators();
        this.transactionForm.get('date')?.clearValidators();
      }

      this.transactionForm.updateValueAndValidity();
    });

    if (!this.isAdd) {
      this.loadTransactionForEdit();
    }
  }

  closeModal() {
    this.showModal = false;
    this.onClose.emit(false);
  }

  removeTransaction() {
    if (this.trans.isExpense(this.transaction)) {
      this.expenseService.deleteExpense(this.transaction.id);
    } else if (this.trans.isIncome(this.transaction)) {
      this.incomeService.deleteIncome(this.transaction.id);
    } else if (this.trans.isBudget(this.transaction)) {
      this.budgetService.deleteBudget(this.transaction.id);
    }
    this.closeModal();
  }

  saveTransaction(event: Event): void {
    event.preventDefault();
    if (this.transactionForm.invalid) {
      this.trans.markAllAsTouched(this.transactionForm);
      console.error('Invalid form');
      return;
    }

    let trans = this.gatherData();
    if (this.isAdd) {
      if (this.trans.isExpense(trans)) {
        this.expenseService.addExpense(trans);
      } else if (this.trans.isIncome(trans)) {
        this.incomeService.addIncome(trans);
      } else if (this.trans.isBudget(trans)) {
        this.budgetService.addBudget(trans);
      }
    } else {
      if (this.trans.isExpense(trans)) {
        this.expenseService.updateExpense(trans)
      } else if (this.trans.isIncome(trans)) {
        this.incomeService.updateIncome(trans);
      } else if (this.trans.isBudget(trans)) {
        this.budgetService.updateBudget(trans);
      }
    }
    this.closeModal();
  }

  gatherData(): Expense | Income | Budget {
    let newTransaction!: Expense | Income | Budget;

    if (this.trans.isExpense(this.transaction)) {
      newTransaction = {
        id: this.transaction.id,
        description: this.transactionForm.get('description')?.value,
        amount: this.transactionForm.get('amount')?.value,
        date: this.transactionForm.get('date')?.value,
        category: this.transactionForm.get('category')?.value,
        type: this.transaction.type,
      } as Expense;
    } else if (this.trans.isIncome(this.transaction)) {
      newTransaction = {
        id: this.transaction.id,
        description: this.transactionForm.get('description')?.value,
        amount: this.transactionForm.get('amount')?.value,
        date: this.transactionForm.get('date')?.value,
        source: this.transactionForm.get('source')?.value,
        type: this.transaction.type,
      } as Income;
    } else if (this.trans.isBudget(this.transaction)) {
      newTransaction = {
        id: this.transaction.id,
        description: this.transactionForm.get('description')?.value,
        amount: this.transactionForm.get('amount')?.value,
        startDate: this.transactionForm.get('startDate')?.value,
        endDate: this.transactionForm.get('endDate')?.value,
        category: this.transactionForm.get('category')?.value,
        type: this.transaction.type,
      } as Budget;
    }
    return newTransaction;
  }

  loadTransactionForEdit(): void {
    this.trans.getTransaction(this.transaction.type, this.transaction.id).subscribe(data => {
      if (!data) {
        console.error('No transaction found to edit');
        return;
      } else if (data.type !== this.transaction.type) {
        console.error('Transaction type does not match');
        return;
      }

      if (data.type === 'expense') {
        this.transaction = data as Expense;
      } else if (data.type === 'income') {
        this.transaction = data as Income;
      } else if (data.type === 'budget') {
        this.transaction = data as Budget;
      }

      const formData = {
        ...this.transaction, 
      }
      
      this.transactionForm.patchValue(formData);
    });
  }
  
}
