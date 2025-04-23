import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Inferencia de tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
