function Label({ label } : { label: string }) {
    return (
        <label className="text-light-700 dark:text-light-500">
            {label}
        </label>
    );
}

export default Label;
