import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductsState } from './types';
import { fetchProducts } from './productApi';

const initialState: ProductsState = {
  products: [] as Product[],
  paging: {
    page: 0,
    size: 20,
    totalPages: 0,
    currentPage: 0,
  },
  filters: {
    brand: '',
    status: [],
  },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      console.log('action.payload', action.payload);
      state.filters = action.payload;
    },
    setPage(state, action) {
      state.paging.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.paging = {
          page: action.payload.paging.page,
          size: action.payload.paging.size,
          totalPages: action.payload.paging.total,
          currentPage: action.payload.paging.currentPage,
        };
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error al cargar productos';
      });
  },
});

export const { setFilters, setPage } = productsSlice.actions;

export default productsSlice.reducer;
