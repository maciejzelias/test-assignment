import * as z from 'zod';

export const AuthorizationObjectSchema = z
  .object({
    email: z.string(),
    accessToken: z.string(),
  })
  .readonly();

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().refine((password) => password.trim().length > 0, {
    message: 'Password cannot be empty',
  }),
});

export type IAuthorizationObject = z.infer<typeof AuthorizationObjectSchema>;
export type ILoginForm = z.infer<typeof LoginFormSchema>;
