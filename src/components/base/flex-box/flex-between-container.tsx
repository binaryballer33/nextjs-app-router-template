

import type { FlexContainerProps } from "@/components/base/flex-box/flex-container"

import FlexContainer from "@/components/base/flex-box/flex-container"

import { cn } from "@/lib/utils"

export default function FlexBetweenContainer({ children, className, stackOn, ...props }: FlexContainerProps) {
    return (
        <FlexContainer
            className={cn("justify-between", className)}
            stackOn={stackOn}
            {...props}
        >
            {children}
        </FlexContainer>
    )
}
