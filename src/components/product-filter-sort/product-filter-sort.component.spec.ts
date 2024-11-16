import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterSortComponent } from './product-filter-sort.component';

describe('ProductFilterSortComponent', () => {
  let component: ProductFilterSortComponent;
  let fixture: ComponentFixture<ProductFilterSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilterSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFilterSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
