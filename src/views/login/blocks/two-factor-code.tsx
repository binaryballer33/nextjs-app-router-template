import type { TFunction } from "i18next"

import LoginIcon from "@mui/icons-material/Login"

import { Container } from "@mui/material"

import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"
import Field from "src/components/react-hook-form/fields"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"

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
                    icon={<LoginIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                    title="Two Factor Authentication"
                />
                <Field.Code name="sixDigitCode" />
                <FormSubmitButton loadingTitle={t("Checking Code...")} title={t("Confirm Code")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
