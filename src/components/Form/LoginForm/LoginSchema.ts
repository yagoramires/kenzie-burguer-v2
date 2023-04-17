import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('O e-mail é obrigatório'),
  password: z
    .string()
    .min(7, 'A senha é obrigatória e precisa de no mínimo 7 caracteres')
    .regex(/(?=.*?[A-Z])/, 'É necessário ao menos uma letra maiúscula')
    .regex(/(?=.*?[a-z])/, 'É necessário ao menos uma letra minúscula')
    .regex(/(?=.*?[0-9])/, 'É necessário pelo menos um número')
    .regex(
      /(?=.*?[!}{,.^?~=+\-_/*\-+.|])/,
      'É necessário pelo menos um caractere especial'
    ),
});

export type TLoginValues = z.infer<typeof LoginSchema>;
