import { Product } from '../../types';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import IProductEntity = ProductStore.IProductEntity;

export const productAdapter: EntityAdapter<IProductEntity> =
  createEntityAdapter<IProductEntity>({
    selectId: (product: IProductEntity) => {
      return product?.id;
    },
    // sort by name in ascending order
    sortComparer: (a: IProductEntity, b: IProductEntity) => a.title.localeCompare(b.title),
  });

export namespace ProductStore {
  export type IProductEntity = Product;
  export type IProductState = EntityState<IProductEntity> & {
    loading: boolean;
    loaded: boolean;
    error: any;
  };

  export const productInitialState: IProductState =
    productAdapter.getInitialState({
      loading: false,
      loaded: false,
      error: null,
    });
}
