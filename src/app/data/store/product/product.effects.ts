import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { productActions } from './product.actions';
import { Store } from '@ngrx/store';
import { selectAllProducts } from './product.selectors';

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

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.addProduct),
      exhaustMap(({ product }) =>
        this.productService.addProduct(product).pipe(
          map((product) => productActions.addProductSuccess({ product })),
          catchError((error) =>
            of(productActions.addProductFailure({ error })),
          ),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.updateProduct),
      exhaustMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          map((product) => productActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(productActions.updateProductFailure({ error })),
          ),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.deleteProduct),
      exhaustMap(({ productId }) =>
        this.productService.deleteProduct(productId).pipe(
          map(() => productActions.deleteProductSuccess({ productId })),
          catchError((error) =>
            of(productActions.deleteProductFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
