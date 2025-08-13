export default function Alert({ type = 'info', children }) {
  return <div className={`alert alert-${type}`} role="alert">{children}</div>;
}