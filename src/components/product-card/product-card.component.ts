import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FloorPipe } from '../../pipes/floor.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CardModule,FloorPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any;
  constructor() { }
}
