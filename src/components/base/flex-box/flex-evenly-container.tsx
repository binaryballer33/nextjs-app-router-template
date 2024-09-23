import type { FlexContainerProps } from "src/components/base/flex-box/flex-container"

import FlexContainer from "src/components/base/flex-box/flex-container"

export default function FlexEvenlyContainer(props: FlexContainerProps) {
    const { children, stackOnMobile, ...restOfProps } = props

    return (
        <FlexContainer justifyContent="space-evenly" stackOnMobile={stackOnMobile} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
