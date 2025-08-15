'use client';
import { useState } from 'react';
import TextField from '../../components/ui/form/TextField';
import PasswordField from '../../components/ui/form/PasswordField'
import Button from '../../components/ui/Button';
import { useForm } from 'react-hook-form';
import { signup ,signin} from '../../lib/api';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
    const data=await signin(values);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-4">
      <div className="w-96 p-8 bg-white rounded-lg shadow-md">
        <div className='mb-8'>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Admin Explora
          </h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextField
            id="email"
            label="Correo electrónico"
            type="email"
            register={register('email', {
              required: 'El correo es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido'
              }
            })}
            error={errors.email}
          />

          <PasswordField
            id="password"
            register={register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
            error={errors.password}
            minLength={6}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                {...register('remember')}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>
          </div>
            <div className='flex items-center justify-center w-full mt-2'>
             <Button type="submit" loading={loading} className="w-full flex justify-center items-center py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white transition-colors">
              Inciar sesion
          </Button>
            </div>
         
        </form>
      </div>
    </div>
  );
}