import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http: HttpClient = inject(HttpClient);

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
