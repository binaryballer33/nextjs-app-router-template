import type { Metadata } from "next/"

import { appMetadata } from "src/utils/config"

import ResetPasswordView from "src/views/reset-password/reset-password-view"

export const metadata: Metadata = appMetadata.resetPassword

export default async function ResetPasswordPage() {
    return <ResetPasswordView />
}
