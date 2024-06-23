import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email().min(5, 'Email must be at least 5 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const initialLoginFormState: TLoginSchema = {
  email: '',
  password: '',
}

export const RegisterSchema = z
  .object({
    firstname: z.string().min(1, 'First name must be at least 1 characters'),
    lastname: z.string().min(1, 'Last name must be at least 1 characters'),
    email: z.string().email().min(5, 'Email must be at least 5 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  // Add a custom validation rule to ensure the password and confirmPassword fields match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords don't match",
    path: ['confirmPassword'],
  })

export const initialRegisterFormState: TRegisterSchema = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export type TLoginSchema = z.infer<typeof LoginSchema>
export type TRegisterSchema = z.infer<typeof RegisterSchema>
