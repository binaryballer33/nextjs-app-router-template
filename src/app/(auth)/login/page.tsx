import type { Metadata } from "next/"

import { appMetadata } from "src/utils/config"

import LoginView from "src/views/login/login-view"

export const metadata: Metadata = appMetadata.login

export default function LoginPage() {
    return <LoginView />
}
