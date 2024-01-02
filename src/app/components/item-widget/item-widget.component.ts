import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-widget.component.html',
  styleUrl: './item-widget.component.scss'
})
export class ItemWidgetComponent {
  description: string = '';
  amount: number = 0;
  category: string = '';
}
