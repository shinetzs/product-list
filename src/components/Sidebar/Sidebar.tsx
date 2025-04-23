import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../redux/products/productSlice';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [status, setStatus] = useState([] as string[]);
  const [brand, setBrand] = useState('');

  const dispatch = useDispatch();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value ? [e.target.value] : [];
    setStatus(newStatus);

    dispatch(setFilters({ status: newStatus, brand: brand }));
  };

  const handleMarcaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBrand = e.target.value;
    setBrand(newBrand);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      dispatch(setFilters({ status: status, brand: newBrand }));
    }, 500);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filters}>
        <h3>Filtros</h3>

        <label>
          Estado:
          <select name="status" value={status[0]} onChange={handleEstadoChange}>
            <option value="">Todo</option>
            <option value="AVAILABLE">Disponible</option>
            <option value="OUT_OF_STOCK">Agotado</option>
          </select>
        </label>

        <label>
          Marca:
          <input
            className={styles.brandInput}
            type="text"
            name="brand"
            value={brand}
            onChange={handleMarcaChange}
            placeholder="Escribe la marca..."
            maxLength={50}
          />
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
