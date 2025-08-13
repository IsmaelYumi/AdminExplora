import { useState } from 'react';

export default function PasswordField({
  id,
  label = 'Contraseña',
  register,
  error,
  minLength = 8,
  ...props
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          minLength={minLength}
          aria-invalid={!!error || undefined}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          {...register}
          {...props}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShow(!show)}
          aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {show ? 'Ocultar' : 'Mostrar'}
        </button>
        {error && <div className="invalid-feedback d-block">{error.message}</div>}
      </div>
      <div className="form-text">Mínimo {minLength} caracteres.</div>
    </div>
  );
}