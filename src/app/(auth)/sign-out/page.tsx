import { appMetadata } from "src/utils/config"

import SignOutView from "src/views/sign-out/sign-out-view"

export const metadata = appMetadata.signOut

export default async function SignOutPage() {
    return <SignOutView />
}
