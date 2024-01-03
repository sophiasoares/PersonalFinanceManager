import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';
import { Expense } from '../models/expense';
import { Income } from '../models/income';
import { Budget } from '../models/budget';

@Pipe({
  name: 'specificType',
  standalone: true
})
export class SpecificTypePipe implements PipeTransform {
  transform(items: Transaction[]): (Expense | Income | Budget)[] {
    return items.filter(item => 
      item.type === 'expense' || 
      item.type === 'income' || 
      item.type === 'budget'
    ) as (Expense | Income | Budget)[];
  }
}
