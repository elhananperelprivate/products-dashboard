import { createFeature, createReducer, on } from '@ngrx/store';
import { productAdapter, ProductStore } from './product.models';
import { productActions } from './product.actions';
import { StoreNameType } from '../../types';
import IProductState = ProductStore.IProductState;
import productInitialState = ProductStore.productInitialState;

export const productFeature = createFeature({
  name: StoreNameType.PRODUCT_FEATURE_KEY,
  reducer: createReducer(
    { ...productInitialState },
    on(productActions.getAllProducts, (state) => ({
      ...state,
      error: undefined,
      loading: true,
    })),
    on(productActions.getAllProductsSuccess, (state, { products }) => {
      return productAdapter.setAll(products, {
        ...state,
        loading: false,
        loaded: true,
      });
    }),
    on(productActions.getAllProductsFailure, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
      loaded: false,
    })),
    on(productActions.addProduct, (state) => ({
      ...state,
      error: undefined,
      loading: true,
    })),
    on(productActions.addProductSuccess, (state, { product }) => {
      return productAdapter.addOne(product, {
        ...state,
        loading: false,
        loaded: true,
      });
    }),
    on(productActions.addProductFailure, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
      loaded: false,
    })),
    on(productActions.updateProduct, (state) => ({
      ...state,
      error: undefined,
      loading: true,
    })),
    on(productActions.updateProductSuccess, (state, { product }) => {
      return productAdapter.upsertOne(product, {
        ...state,
        loading: false,
        loaded: true,
      });
    }),
    on(productActions.updateProductFailure, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
      loaded: false,
    })),
    on(productActions.deleteProduct, (state) => ({
      ...state,
      error: undefined,
      loading: true,
    })),
    on(productActions.deleteProductSuccess, (state, { productId }) => {
      return productAdapter.removeOne(productId, {
        ...state,
        loading: false,
        loaded: true,
      });
    }),
    on(productActions.deleteProductFailure, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
      loaded: false,
    })),
  ),
});

export function productReducer(
  state: IProductState | undefined,
  action: any,
): IProductState {
  return productFeature.reducer(state, action);
}
