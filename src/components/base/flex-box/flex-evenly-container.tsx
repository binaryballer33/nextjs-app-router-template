import type { FlexContainerProps } from "@/components/base/flex-box/flex-container"

import FlexContainer from "@/components/base/flex-box/flex-container"
import { cn } from "@/lib/utils"

export default function FlexEvenlyContainer(props: FlexContainerProps) {
    const { children, className, stackOn, ...restOfProps } = props

    return (
        <FlexContainer className={cn("justify-evenly", className)} stackOn={stackOn} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
