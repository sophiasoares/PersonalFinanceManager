import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-widget',
  standalone: true,
  imports: [],
  templateUrl: './detail-widget.component.html',
  styleUrl: './detail-widget.component.scss'
})
export class DetailWidgetComponent {
  itemType: string = '';
  description: string = '';
  amount: number = 0;
  category: string = '';
  date: Date = new Date();
  endDate?: Date = new Date();
}
