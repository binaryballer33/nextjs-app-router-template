type OAuthProvider = {
    id: "google" | "facebook"
    name: string
    logo: string
}

const oAuthProviders = [
    {
        id: "google",
        name: "Google",
        logo: "/placeholders/logo/google-icon.svg",
    },
    {
        id: "facebook",
        name: "Facebook",
        logo: "/placeholders/logo/facebook.svg",
    },
] satisfies OAuthProvider[]

export default oAuthProviders
