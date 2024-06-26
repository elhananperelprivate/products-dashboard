import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../../types';
import { Store } from '@ngrx/store';
import {selectAllProducts, selectProductsLength} from '../../store';
import {getUniqueProductId} from "../../utils";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http: HttpClient = inject(HttpClient);
  private store: Store = inject(Store);

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    const uniqueProductId = getUniqueProductId(this.store.selectSignal(selectAllProducts)());
    return of({ ...product, id: uniqueProductId }).pipe(delay(2000));
  }

  updateProduct(product: Product): Observable<Product> {
    return of(product).pipe(delay(2000));
  }

  deleteProduct(productId: number) {
    return of(productId).pipe(delay(2000));
  }
}
