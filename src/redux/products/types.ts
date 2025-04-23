export interface Price {
  lowest: number;
  offerPrice: number;
  normalPrice: number;
}

export interface Competitor {
  productId: number;
  storeId: number;
  storeName: string;
  name: string;
  sku: string;
  brand: string;
  model: string;
  url: string;
  imageUrl: string;
  status: string;
  matchStatus: string;
  created: string;
  updated: string;
  extracted: string;
  prices: Price;
}

export interface Category {
  id: number;
  categoryIdPath: string;
  fullPath: string;
}

export interface Product {
  productId: number;
  storeName: string;
  name: string;
  prices: Price;
}

export interface Paging {
  page: number;
  size: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductsState {
  products: Product[];
  paging: Paging;
  filters: {
    brand: '';
    status: [];
  };
  loading: boolean;
  error: string | null;
}
