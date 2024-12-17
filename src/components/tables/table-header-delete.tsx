import { Trash2 } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export default function TableHeaderDelete() {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <Trash2 className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete row</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
