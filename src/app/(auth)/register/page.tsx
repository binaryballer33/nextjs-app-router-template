import type { Metadata } from "next/"

import { appMetadata } from "@/utils/config"

import RegisterView from "@/views/register/register-view"

export const metadata: Metadata = appMetadata.register

export default async function RegisterPage() {
    return <RegisterView />
}
