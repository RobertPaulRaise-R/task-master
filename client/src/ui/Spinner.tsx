function Spinner({ size }: { size: number }) {
    return (
        <div
            className={`text-light-200 dark:text-light-200 absolute top-0 left-0 inline-block size-3 h-20 w-20 animate-spin rounded-full border-3 border-current border-t-transparent blur-2xl ${size}`}
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default Spinner;
