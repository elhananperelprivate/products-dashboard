export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export const ProductViewMode = {
  Grid: 'grid',
  List: 'list',
};

export type ProductViewMode =
  (typeof ProductViewMode)[keyof typeof ProductViewMode];

export const ProductFormMode = {
  Create: 'create',
  Edit: 'edit',
};

export type ProductFormMode =
  (typeof ProductFormMode)[keyof typeof ProductFormMode];

export const ProductCategory = {
  Jewelery: 'jewelery',
  Electronics: 'electronics',
  Furniture: 'furniture',
  MensClothing: 'men\'s clothing',
  WomensClothing: 'women\'s clothing',
};

