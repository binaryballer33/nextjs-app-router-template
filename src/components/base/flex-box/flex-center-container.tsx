import type { FlexContainerProps } from "src/components/base/flex-box/flex-container"

import FlexContainer from "src/components/base/flex-box/flex-container"

export default function FlexCenterContainer(props: FlexContainerProps) {
    const { children, stackOnMobile, ...restOfProps } = props

    return (
        <FlexContainer justifyContent="center" stackOnMobile={stackOnMobile} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
