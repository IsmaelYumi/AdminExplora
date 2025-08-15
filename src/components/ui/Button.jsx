export default function Button({ children, className = '', loading = false, ...props }) {
  return (
    <button
      className={className}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Procesando...' : children}
    </button>
  );
}