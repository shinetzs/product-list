import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect } from 'vitest';
import ProductTable from './ProductTable';
import {
  mockStoreWithoutValues,
  mockStoreWithValues,
} from './Productable.mocks';

const renderWithStore = (store = mockStoreWithValues) => {
  const storeInstance = configureStore({
    reducer: {
      products: (state = store) => state,
    },
  });

  return render(
    <Provider store={storeInstance}>
      <ProductTable />
    </Provider>,
  );
};

describe('ProductTable', () => {
  test('Show products', async () => {
    renderWithStore();

    await waitFor(() => {
      expect(screen.getByText('Producto B')).toBeInTheDocument();
    });
  });

  test('Displays " No hay datos." when no products are available', async () => {
    renderWithStore(mockStoreWithoutValues);

    await waitFor(() => {
      expect(screen.getByText('No hay datos.')).toBeInTheDocument();
    });
  });
});
