import type { Metadata } from "next/"

import { appMetadata } from "src/utils/config"

import ForgotPasswordView from "src/views/forgot-password/forgot-password-view"

export const metadata: Metadata = appMetadata.forgotPassword

export default async function ResetPasswordPage() {
    return <ForgotPasswordView />
}
