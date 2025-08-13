'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signup } from '../../lib/api';
import { signupSchema } from '../../lib/validation';

import TextField from '../ui/form/TextField';
import PasswordField from '../ui/form/PasswordField';
import Alert from './Alert';
import Button from './Button';

export default function SignupForm() {
  const [serverMsg, setServerMsg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    setServerMsg(null);
    try {
      const data = await signup(values);
      setServerMsg({ type: 'success', text: `¡Cuenta creada! Bienvenido/a, ${data.user.name}.` });
      reset();
    } catch (err) {
      setServerMsg({ type: 'danger', text: err.message });
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h1 className="h3 mb-3">Crear cuenta</h1>

        {serverMsg && <Alert type={serverMsg.type}>{serverMsg.text}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            id="name"
            label="Nombre"
            register={register('name')}
            error={errors.name}
            autoComplete="name"
          />

          <TextField
            id="email"
            type="email"
            label="Email"
            register={register('email')}
            error={errors.email}
            autoComplete="email"
          />

          <PasswordField
            id="password"
            label="Contraseña"
            register={register('password')}
            error={errors.password}
            autoComplete="new-password"
            minLength={8}
          />

          <Button className="w-100" loading={isSubmitting}>
            {isSubmitting ? 'Creando...' : 'Registrarme'}
          </Button>
        </form>

        <p className="text-center mt-3 mb-0">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
