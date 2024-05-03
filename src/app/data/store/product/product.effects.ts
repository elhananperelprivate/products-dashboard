import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import { productActions } from './product.actions';
import { Store } from '@ngrx/store';
import { selectAllProducts, selectProductLoaded } from './product.selectors';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private store = inject(Store);

  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getAllProducts),
      withLatestFrom(this.store.select(selectAllProducts)),
      exhaustMap(([, products]) => {
        if (products?.length > 0)
          return of(productActions.getAllProductsSuccess({ products }));
        return this.productService.getAllProducts().pipe(
          map((products) => {
            return productActions.getAllProductsSuccess({ products });
          }),
          catchError((error) =>
            of(productActions.getAllProductsFailure({ error })),
          ),
        );
      }),
    ),
  );
}
