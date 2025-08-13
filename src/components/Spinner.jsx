export default function Spinner({ className = '' }) {
  return <div className={`spinner-border spinner-border-sm ${className}`} role="status" aria-hidden="true" />;
}