import type { SvgIconTypeMap } from "@mui/material"
import type { OverridableComponent } from "@mui/material/OverridableComponent"

import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"

export type OAuthProvider = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    id: "facebook" | "google"
    name: string
}

const oAuthProviders = {
    facebook: {
        icon: FacebookIcon,
        id: "facebook",
        name: "Facebook",
    } satisfies OAuthProvider,
    google: {
        icon: GoogleIcon,
        id: "google",
        name: "Google",
    } satisfies OAuthProvider,
}

export default oAuthProviders
