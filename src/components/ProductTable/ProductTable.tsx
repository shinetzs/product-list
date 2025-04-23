import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductTable.module.css';

import { AppDispatch, RootState } from '../../redux/store';
import { Product } from '../../redux/products/types';
import { setPage } from '../../redux/products/productSlice';
import Pagination from '../Pagination/Pagination';
import { discount, formatCurrency } from '../../utils/formatters';

const ProductTable = () => {
  const { products, loading, error, paging } = useSelector(
    (state: RootState) => state.products,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage <= paging.totalPages) {
      dispatch(setPage(newPage));
    }
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr key={0}>
          <td colSpan={6} style={{ textAlign: 'center' }}>
            Cargando datos...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr key={0}>
          <td colSpan={6} style={{ textAlign: 'center', color: 'red' }}>
            Error al cargar los datos
          </td>
        </tr>
      );
    }

    if (products.length === 0) {
      return (
        <tr key={0}>
          <td colSpan={6} style={{ textAlign: 'center' }}>
            No hay datos.
          </td>
        </tr>
      );
    }

    return products.map((item: Product) => (
      <tr key={item.productId}>
        <td>{item.name}</td>
        <td>{item.storeName}</td>
        <td>{formatCurrency(item.prices.normalPrice)}</td>
        <td>{formatCurrency(item.prices.offerPrice)}</td>
        <td>{formatCurrency(item.prices.lowest)}</td>
        <td>{discount(item.prices.normalPrice, item.prices.lowest)}</td>
      </tr>
    ));
  };

  return (
    <>
      <main className={styles.content}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tienda</th>
              <th>Precio Normal</th>
              <th>Precio Oferta</th>
              <th>Precio Más Bajo</th>
              <th>Descuenta</th>
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
        <Pagination
          currentPage={paging.currentPage}
          totalPages={Math.ceil(paging.totalPages / paging.size)}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
};

export default ProductTable;
