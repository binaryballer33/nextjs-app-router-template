import type { BaseSyntheticEvent, ReactNode } from "react"
import type { UseFormReturn } from "react-hook-form"

import { Form as RHFProvider } from "@/components/ui/form"


export type FormProps = {
    children: ReactNode
    form: UseFormReturn<any>
    onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
}

export default function Form({ children, form, onSubmit }: FormProps) {
    return (
        <RHFProvider {...form}>
            <form autoComplete="off" noValidate onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </RHFProvider>
    )
}
