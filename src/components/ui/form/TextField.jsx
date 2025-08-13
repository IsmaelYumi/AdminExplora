export default function TextField({
  id,
  label,
  type = 'text',
  register,
  error,
  helpText,
  ...props
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        id={id}
        type={type}
        aria-invalid={!!error || undefined}
        aria-describedby={helpText ? `${id}-help` : undefined}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...register}
        {...props}
      />
      {helpText && <div id={`${id}-help`} className="form-text">{helpText}</div>}
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}