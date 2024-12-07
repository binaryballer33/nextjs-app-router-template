"use client"

import { useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ResetFormProps = {
    className?: string
    size?: "default" | "icon" | "lg" | "sm"
    title: string
    variant?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary"
}

export default function ResetFormButton(props: ResetFormProps) {
    const { className, size = "sm", title, variant = "outline" } = props

    const {
        clearErrors,
        formState: { isSubmitting },
        reset: resetForm
    } = useFormContext()

    return (
        <Button
            className={cn(
                "mt-1 whitespace-nowrap px-4",
                className
            )}
            disabled={isSubmitting}
            onClick={() => {
                resetForm();
                clearErrors();
            }}
            size={size}
            variant={variant}
        >
            {title}
        </Button>
    )
}
