import { productAdapter, ProductStore } from './product.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreNameType } from '../../types';
import IProductState = ProductStore.IProductState;

export const selectProductState = createFeatureSelector<IProductState>(
  StoreNameType.PRODUCT_FEATURE_KEY,
);

export const { selectAll, selectEntities } = productAdapter.getSelectors();

export const selectAllProducts = createSelector(
  selectProductState,
  (state: IProductState) => selectAll(state),
);

export const selectProductEntities = createSelector(
  selectProductState,
  (state: IProductState) => selectEntities(state),
);

export const selectProductById = (id: string) =>
  createSelector(selectProductEntities, (entities) => entities[id]);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: IProductState) => state.loading,
);

export const selectProductLoaded = createSelector(
  selectProductState,
  (state: IProductState) => state.loaded,
);

export const selectProductsLength = createSelector(
  selectAllProducts,
  (products) => products.length,
);
