import type { RegisterRequest } from "@/types/forms/register"

import { type ReactNode } from "react"

import { useFormContext } from "react-hook-form"

import { Mail, Key, Edit } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"

type AuthFormInputProps = {
    className?: string
    inputName: keyof RegisterRequest
    label: string
    padding?: number
    showVisibilityButtons?: boolean
    startAdornment?: ReactNode
}

export default function AuthFormInput({
    className,
    inputName,
    label,
    padding,
    showVisibilityButtons = false,
    startAdornment = null
}: AuthFormInputProps) {
    const { control } = useFormContext()

    const adornment = startAdornment || getStartAdornment(inputName)
    const placeholder = getPlaceholder(inputName, label)

    return (
        <FormField
            control={control}
            name={inputName}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabel className="font-medium">
                            {label}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                {adornment}
                            </div>
                            <Input
                                {...field}
                                className={cn(
                                    "bg-muted/50 pl-10",
                                    padding && `p-${padding}`,
                                    className
                                )}
                                placeholder={placeholder}
                                type={showVisibilityButtons ? "password" : "text"}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

function getStartAdornment(inputName: keyof RegisterRequest) {
    const iconProps = { className: "h-4 w-4" }

    switch (inputName) {
        case "email":
            return <Mail {...iconProps} />
        case "password":
        case "confirmPassword":
            return <Key {...iconProps} />
        default:
            return <Edit {...iconProps} />
    }
}

function getPlaceholder(inputName: keyof RegisterRequest, label: string) {
    if (label === "Confirm New Password") return "Write Your New Password Again"
    if (label === "Confirm Password" || inputName === "confirmPassword") return "Write Your Password Again"
    return `Write Your ${label}`
}
