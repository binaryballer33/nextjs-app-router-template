import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FormResendCodeProps = {
    className?: string
    disabled?: boolean
    onResendCode?: () => void
    value?: number
}

export default function FormResendCode({ className, disabled, onResendCode, value }: FormResendCodeProps) {
    return (
        <div className={cn("mt-3 text-center text-sm", className)}>
            Don't have a code?{" "}
            <Button
                className={cn("px-1 font-semibold", disabled && "pointer-events-none text-muted-foreground")}
                disabled={disabled}
                onClick={onResendCode}
                variant="link"
            >
                Resend{disabled && value && value > 0 ? ` (${value}s)` : ""}
            </Button>
        </div>
    )
}
