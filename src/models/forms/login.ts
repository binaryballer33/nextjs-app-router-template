import { z as zod } from "zod"

export const LoginFormSchema = zod.object({
  email: zod.string().min(5, { message: "Email Must Be At Least 5 Characters" }).email(),
  password: zod.string().min(6, { message: "Password Must Be At Least 6 Characters" }),
})

export type LoginForm = zod.infer<typeof LoginFormSchema>

export const defaultValuesLoginForm = {
  email: "",
  password: "",
} satisfies LoginForm
