import type { ReactNode } from "react"
import type { UseFormReturn } from "react-hook-form"

import { FormProvider as RHFProvider } from "react-hook-form"

export type FormProps = {
    children: ReactNode
    methods: UseFormReturn<any>
    onSubmit?: () => void
}

export default function Form({ children, methods, onSubmit }: FormProps) {
    return (
        <RHFProvider {...methods}>
            <form autoComplete="off" noValidate onSubmit={onSubmit}>
                {children}
            </form>
        </RHFProvider>
    )
}
