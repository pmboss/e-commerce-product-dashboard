import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-product-filter-sort',
  standalone: true,
  imports: [FormsModule, CommonModule, DropdownModule],
  templateUrl: './product-filter-sort.component.html',
  styleUrl: './product-filter-sort.component.scss'
})

export class ProductFilterSortComponent {
  @Input()
  products!: Product[];
  @Output() filteredProducts = new EventEmitter<Product[]>();
  categories: string[] = [];
  priceRanges: string[] = [
    '0 - 50',
    '50 - 100',
    '100 - 200',
    '200 - 500',
    '500 - 1000',
    '1000+'
  ];
  ratings: number[] = [1, 2, 3, 4, 5];
  sortOptions = [{
    label: 'Price: Low to High',
    value: 'price-asc'
  },
  {
    label: 'Price: High to Low',
    value: 'price-desc'
  }
  ];
  selectedCategory: string = '';
  selectedPriceRange: string = '';
  selectedRating: number = 0;
  selectedSortOrder = '';

  constructor(private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && changes['products'].currentValue) {
      this.resetFilters();
      this.resetSortOrder();
    }
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.productService.getCategoryList().subscribe(
      (categories) => {
        this.categories = categories;
      }
    )
  }

  applySort(): void {
    let filtered = this.products;
    if (this.selectedSortOrder === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOrder === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    this.filteredProducts.emit(filtered);
  }

  applyFiltersAndSorting(): void {
    // Apply category filter
    let filtered = this.products;
    if (this.selectedCategory) {
      filtered = filtered.filter((product) => product.category === this.selectedCategory);
    }

    // Apply price filter
    if (this.selectedPriceRange) {
      const [min, max] = this.selectedPriceRange.split('-').map(price => parseFloat(price));
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    // Apply rating filter
    if (this.selectedRating > 0) {
      filtered = filtered.filter((product) => Math.floor(product.rating) === this.selectedRating);
    }
    this.filteredProducts.emit(filtered);
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.selectedPriceRange = '';
    this.selectedRating = 0;
    this.filteredProducts.emit(this.products);
  }
  resetSortOrder() {
    this.selectedSortOrder = '';
  }
}
