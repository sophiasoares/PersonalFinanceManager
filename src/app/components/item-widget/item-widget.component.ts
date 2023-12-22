import { Component } from '@angular/core';

@Component({
  selector: 'app-item-widget',
  standalone: true,
  imports: [],
  templateUrl: './item-widget.component.html',
  styleUrl: './item-widget.component.scss'
})
export class ItemWidgetComponent {
  description: string = '';
  amount: number = 0;
  category: string = '';
}
