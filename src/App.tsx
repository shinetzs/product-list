import { useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import ProductTable from './components/ProductTable/ProductTable';
import Sidebar from './components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { fetchProducts } from './redux/products/productApi';

const App = () => {
  const { currentPage, size } = useSelector(
    (state: RootState) => state.products.paging,
  );
  const { brand, status } = useSelector(
    (state: RootState) => state.products.filters,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, size, brand, status }));
  }, [currentPage, size, dispatch, status, brand]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <ProductTable />
      </div>
    </div>
  );
};

export default App;
