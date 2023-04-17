import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório'),
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
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória.'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas precisam ser iguais.',
    path: ['confirmPassword'],
  });

export type TRegisterValues = z.infer<typeof RegisterSchema>;
