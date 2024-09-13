type OAuthProvider = {
    id: "facebook" | "google"
    logo: string
    name: string
}

const oAuthProviders = [
    {
        id: "google",
        logo: "/placeholders/logo/google-icon.svg",
        name: "Google",
    },
    {
        id: "facebook",
        logo: "/placeholders/logo/facebook.svg",
        name: "Facebook",
    },
] satisfies OAuthProvider[]

export default oAuthProviders
