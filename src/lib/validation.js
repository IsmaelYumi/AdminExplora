import { z } from 'zod';

export const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .transform(v => v.trim()),
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Email inválido')
    .transform(v => v.trim().toLowerCase()),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(passwordRules, 'Debe incluir mayúscula, minúscula, número y símbolo'),
  confirmPassword: z.string(),
  terms: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Las contraseñas no coinciden',
    });
  }
  if (!data.terms) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['terms'],
      message: 'Debes aceptar los términos',
    });
  }
});
