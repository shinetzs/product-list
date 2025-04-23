import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Sidebar from './Sidebar';
import productReducer from '../../redux/products/productSlice';
import { vi } from 'vitest';

describe('Sidebar', () => {
  it('renders correctly', () => {
    const store = configureStore({
      reducer: {
        products: productReducer,
      },
    });

    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    );

    expect(screen.getByText(/filtros/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/escribe la marca/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
  });

  it('allows selecting the AVAILABLE option and displays "Disponible"', () => {
    const store = configureStore({
      reducer: {
        products: productReducer,
      },
    });

    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    );

    const select = screen.getByLabelText(/estado/i);
    fireEvent.change(select, { target: { value: 'AVAILABLE' } });

    expect((select as HTMLSelectElement).value).toBe('AVAILABLE');

    const selectedOption = screen.getByRole('option', {
      name: 'Disponible',
    }) as HTMLOptionElement;
    expect(selectedOption.selected).toBe(true);
  });

  it('dispatches an action when selecting AVAILABLE', () => {
    const store = configureStore({
      reducer: {
        products: productReducer,
      },
    });

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    );

    const select = screen.getByLabelText(/estado/i);
    fireEvent.change(select, { target: { value: 'AVAILABLE' } });

    expect((select as HTMLSelectElement).value).toBe('AVAILABLE');

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
