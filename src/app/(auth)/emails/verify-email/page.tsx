import { appMetadata } from "src/utils/config"

import VerifyEmailView from "src/views/verify-email/verify-email-view"

export const metadata = appMetadata.verifyEmail

export default async function VerifyEmailPage() {
    return <VerifyEmailView />
}
