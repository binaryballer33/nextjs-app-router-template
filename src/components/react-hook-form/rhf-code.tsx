import { Controller, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"






type RHFCodesProps = {
    className?: string
    length?: number
    name: string
}

export default function RHFCode({ className, length = 6, name }: RHFCodesProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                    <div className={cn("flex gap-2", className)}>
                        {[...Array(length)].map((_, index) => (
                            <Input
                                className={cn(
                                    "h-12 w-12 text-center text-lg",
                                    error && "border-destructive"
                                )}
                                inputMode="numeric"
                                key={index}
                                maxLength={1}
                                name={`${name}-${index}`}
                                onChange={(e) => {
                                    const { value } = e.target
                                    const values = field.value ? field.value.split("") : []
                                    values[index] = value
                                    field.onChange(values.join(""))

                                    // Auto-focus next input
                                    if (value && index < length - 1) {
                                        const nextInput = document.querySelector(
                                            `input[name="${name}-${index + 1}"]`
                                        ) as HTMLInputElement
                                        nextInput?.focus()
                                    }
                                }}
                                pattern="\d*"
                                placeholder="-"
                                type="text"
                                value={field.value?.[index] || ""}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="mt-2 px-2 text-sm text-destructive">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    )
}
