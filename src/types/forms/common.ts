import type { LucideProps } from "lucide-react"

import { Facebook } from "lucide-react"


export type OAuthProvider = {
    icon: LucideProps | string
    id: "facebook" | "google"
    name: string
}

const oAuthProviders = {
    facebook: {
        icon: Facebook,
        id: "facebook",
        name: "Facebook",
    } satisfies OAuthProvider,
    google: {
        icon: "G",
        id: "google",
        name: "Google",
    } satisfies OAuthProvider,
}

export default oAuthProviders

