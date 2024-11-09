import type { Metadata } from "next/"

import { appMetadata } from "src/utils/config"

import RegisterView from "src/views/register/register-view"

export const metadata: Metadata = appMetadata.register

export default async function RegisterPage() {
    return <RegisterView />
}
