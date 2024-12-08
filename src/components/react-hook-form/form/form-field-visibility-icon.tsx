import type { RegisterRequest } from "@/types/forms/register"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

type FormFieldVisibilityIconProps = {
    className?: string
    iconSize?: number
    inputName: keyof RegisterRequest | string
    isFieldVisible: boolean
    isFieldVisibleToggle: () => void
}

export default function FormFieldVisibilityIcon(props: FormFieldVisibilityIconProps) {
    const { className, iconSize = 14, inputName, isFieldVisible, isFieldVisibleToggle } = props

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className={cn("h-8 w-8", className)}
                        onClick={isFieldVisibleToggle}
                        size="icon"
                        type="button"
                        variant="outline"
                    >
                        {isFieldVisible ? (
                            <EyeOff
                                aria-label={`hide ${inputName}`}
                                className={cn("h-4 w-4", iconSize && `h-[${iconSize}px] w-[${iconSize}px]`)}
                            />
                        ) : (
                            <Eye
                                aria-label={`show ${inputName}`}
                                className={cn("h-4 w-4", iconSize && `h-[${iconSize}px] w-[${iconSize}px]`)}
                            />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{isFieldVisible ? `hide ${inputName}` : `show ${inputName}`}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
