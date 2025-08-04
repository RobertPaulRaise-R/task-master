interface InputProps {
  type?: string;
  width?: string;
  placeholder?: string;
  [key: string]: unknown;
}

function Input({ type = "text", placeholder, width, ...rest }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`border-light-800 dark:border-neutral-700 rounded-sm border px-3 py-2 outline-none dark:text-white placeholder:text-neutral-400 ${width}`}
      {...rest}
    />
  );
}

export default Input;
