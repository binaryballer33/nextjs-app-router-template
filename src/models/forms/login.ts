import { z as zod } from 'zod'

export const defaultValuesLoginForm = {
  email: '',
  password: '',
} satisfies LoginForm

export const LoginFormSchema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
})

export type LoginForm = zod.infer<typeof LoginFormSchema>
