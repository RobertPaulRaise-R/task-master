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
      className={`border-light-800 rounded-sm border px-3 py-2 outline-none ${width}`}
      {...rest}
    />
  );
}

export default Input;
