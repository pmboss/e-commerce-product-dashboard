import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetails } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, limit: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${this.apiUrl}?skip=${page}&limit=${limit}`);
  }

  getCategoryList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/category-list`);
  }
}
