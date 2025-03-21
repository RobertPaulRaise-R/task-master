interface InputProps {
  type?: string;
  width?: string;
  [key: string]: unknown;
}

function Input({ type = "text", width, ...rest }: InputProps) {
  return (
    <input
      type={type}
      className={`border-light-900 border px-3 py-2 outline-none ${width}`}
      {...rest}
    />
  );
}

export default Input;
