import styles from "./pagination.module.scss";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        ⟨
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={page === index ? styles.active : ""}
          onClick={() => onPageChange(index)}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        ⟩
      </button>
    </div>
  );
}
