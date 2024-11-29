import { type ReactNode } from "react"
import { useState } from "react"

import { useFormContext } from "react-hook-form"

import { Eye, EyeOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

type Props = {
    className?: string
    label?: string
    name: string
    showVisibilityToggle?: boolean
    startAdornment?: ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

export default function RHFInput(props: Props) {
    const { className, label, name, showVisibilityToggle, startAdornment, type, ...other } = props
    const { control, setValue, watch } = useFormContext()
    const [showPassword, setShowPassword] = useState(false)

    // Determine input type based on visibility toggle and password state
    const getInputType = () => {
        if (type === "email") return "email"
        if (type === "number") return "number"
        if (showVisibilityToggle) {
            return showPassword ? "text" : "password"
        }
        return type
    }

    const inputValue = watch(name)
    const hasValue = inputValue !== "" && inputValue !== undefined

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && (
                        <FormLabel className="font-medium">
                            {label}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="relative">
                            {startAdornment && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {startAdornment}
                                </div>
                            )}

                            <Input
                                {...field}
                                className={cn(
                                    "bg-muted/50",
                                    startAdornment && "pl-10",
                                    (showVisibilityToggle || hasValue) && "pr-20"
                                )}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    if (type === "number") {
                                        field.onChange(Number(event.target.value))
                                    } else {
                                        field.onChange(event.target.value)
                                    }
                                }}
                                type={getInputType()}
                                value={type === "number" && field.value === 0 ? "" : field.value}
                                {...other}
                            />

                            {/* Right side buttons */}
                            {(showVisibilityToggle || hasValue) && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                    {hasValue && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        className="h-6 w-6"
                                                        onClick={() => setValue(name, "")}
                                                        size="icon"
                                                        type="button"
                                                        variant="ghost"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Clear {name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}

                                    {showVisibilityToggle && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        className="h-6 w-6"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        size="icon"
                                                        type="button"
                                                        variant="ghost"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{showPassword ? "Hide" : "Show"} password</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
