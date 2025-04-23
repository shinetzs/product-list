import { ProductsState } from '../../redux/products/types';

export const mockStoreWithValues: ProductsState = {
  products: [
    {
      productId: 1,
      name: 'Producto A',
      storeName: 'Tienda 1',
      prices: {
        normalPrice: 100,
        offerPrice: 80,
        lowest: 75,
      },
    },
    {
      productId: 2,
      name: 'Producto B',
      storeName: 'Tienda 2',
      prices: {
        normalPrice: 200,
        offerPrice: 180,
        lowest: 275,
      },
    },
  ],
  paging: {
    page: 1,
    size: 20,
    totalPages: 1,
    currentPage: 1,
  },
  filters: {
    brand: '',
    status: [],
  },
  loading: false,
  error: null,
};

export const mockStoreWithoutValues: ProductsState = {
  products: [],
  paging: {
    page: 1,
    size: 20,
    totalPages: 1,
    currentPage: 1,
  },
  filters: {
    brand: '',
    status: [],
  },
  loading: false,
  error: null,
};
