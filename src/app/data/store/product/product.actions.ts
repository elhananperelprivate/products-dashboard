import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../types';

const getAllProductEvents = {
  getAllProducts: emptyProps(),
  getAllProductsSuccess: props<{
    products: Product[];
  }>(),
  getAllProductsFailure: props<{
    error: Error;
  }>(),
};

const addProductEvents = {
  addProduct: props<{
    product: Product;
  }>(),
  addProductSuccess: props<{
    product: Product;
  }>(),
  addProductFailure: props<{
    error: Error;
  }>(),
};

const deleteProductEvents = {
  deleteProduct: props<{
    productId: string;
  }>(),
  deleteProductSuccess: props<{
    productId: string;
  }>(),
  deleteProductFailure: props<{
    error: Error;
  }>(),
};

const updateProductEvents = {
  updateProduct: props<{
    product: Product;
  }>(),
  updateProductSuccess: props<{
    product: Product;
  }>(),
  updateProductFailure: props<{
    error: Error;
  }>(),
};

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    ...getAllProductEvents,
    ...addProductEvents,
    ...deleteProductEvents,
    ...updateProductEvents,
  },
});
