// Pagination.tsx

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={handlePrevious} disabled={currentPage === 0}>
        Atrás
      </button>
      <span style={{ margin: '0 10px' }}>
        Página {currentPage + 1} de {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
        Adelante
      </button>
    </div>
  );
};

export default Pagination;
