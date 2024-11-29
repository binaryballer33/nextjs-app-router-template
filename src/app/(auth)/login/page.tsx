import type { Metadata } from "next/"

import { appMetadata } from "@/utils/config"

import LoginView from "@/views/login/login-view"

export const metadata: Metadata = appMetadata.login

export default function LoginPage() {
    return <LoginView />
}
