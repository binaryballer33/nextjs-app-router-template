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
            <form noValidate onSubmit={onSubmit}>
                {children}
            </form>
        </RHFProvider>
    )
}
