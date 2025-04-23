import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface FetchParams {
  page?: number;
  size?: number;
  brand?: string;
  status?: string[];
}

export const fetchProducts = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  FetchParams | void,
  { rejectValue: string }
>('products/fetchProducts', async (paramsArg, { rejectWithValue }) => {
  const params: FetchParams = paramsArg ?? {
    page: 0,
    size: 20,
    brand: '',
    status: [],
  };

  try {
    const response = await axios.post(
      `${API_URL}/products`,
      {
        paging: {
          page: params.page,
          size: params.size,
        },
        filters: {
          brand: params.brand,
          status: params.status,
        },
      },
      {
        headers: {
          apikey: API_KEY,
        },
      },
    );

    console.log('response', response.data);

    return response.data ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error:', error);

    return rejectWithValue(error.response?.data || 'Error desconocido');
  }
});
