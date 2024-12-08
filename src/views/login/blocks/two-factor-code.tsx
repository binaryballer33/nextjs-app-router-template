import type { TFunction } from "i18next"

import Container from "@/components/base/container"
import FlexCenteredFullScreenContainer from "@/components/base/flex-box/flex-center-full-screen-container"
import Field from "@/components/react-hook-form/fields"
import FormHead from "@/components/react-hook-form/form/form-head"
import FormSubmitButton from "@/components/react-hook-form/form/form-submit-button"
import { LogIn } from "lucide-react"

type TwoFactorCodeProps = {
    t: TFunction<"translation", undefined>
}

export default function TwoFactorCode(props: TwoFactorCodeProps) {
    const { t } = props

    return (
        <FlexCenteredFullScreenContainer minHeight="80dvh">
            <Container maxWidth="sm">
                <FormHead
                    description="Enter The Code Sent To Your Email"
                    icon={<LogIn className="h-20 w-20 text-primary" />}
                    title="Two Factor Authentication"
                />
                <Field.Code name="sixDigitCode" />
                <FormSubmitButton loadingTitle={t("Checking Code...")} title={t("Confirm Code")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
