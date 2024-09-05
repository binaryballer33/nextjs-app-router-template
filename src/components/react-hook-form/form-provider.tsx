import type { ReactNode } from "react"

import type { UseFormReturn } from "react-hook-form"
import { FormProvider as RHFProvider } from "react-hook-form"

export type FormProps = {
    onSubmit?: () => void
    children: ReactNode
    methods: UseFormReturn<any>
}

export default function Form({ children, onSubmit, methods }: FormProps) {
    return (
        <RHFProvider {...methods}>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
                {children}
            </form>
        </RHFProvider>
    )
}
