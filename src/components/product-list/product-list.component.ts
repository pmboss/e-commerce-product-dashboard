import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductFilterSortComponent } from '../product-filter-sort/product-filter-sort.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ButtonModule, FormsModule, ProductFilterSortComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  nextList: number = 1;
  limit: number = 15;
  loading: boolean = false;
  error: string | null = null;
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.loading) return;
    this.loading = true;
    this.productService.getProducts(this.nextList, this.limit).subscribe({
      next: (data) => {
        this.products = [...this.products, ...data.products];
        this.nextList = this.nextList + 15;
      },
      error: (err) => {
        this.error = 'Failed to load products';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  setFilterproducts(event: Product[]) {
    this.filteredProducts = event;
  }
}
