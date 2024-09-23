import type { FlexContainerProps } from "src/components/base/flex-box/flex-container"

import FlexContainer from "src/components/base/flex-box/flex-container"

export default function FlexAroundContainer(props: FlexContainerProps) {
    const { children, stackOnMobile, ...restOfProps } = props

    return (
        <FlexContainer justifyContent="space-around" stackOnMobile={stackOnMobile} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
