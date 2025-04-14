function Spinner({ size }: { size: number }) {
  return (
    <div
      className={`text-light-200 dark:text-light-200 inline-block size-3 animate-spin rounded-full border-3 border-current border-t-transparent ${size}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
