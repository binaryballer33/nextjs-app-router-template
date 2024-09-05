import { BACKEND_BASE_URL } from "src/utils/secrets"

// API URLs
const YU_GI_OH_API_BASE_URL = `${BACKEND_BASE_URL}/api/yu-gi-oh`
const EMAIL_API_BASE_URL = `${BACKEND_BASE_URL}/api/emails`

const yugiohApi = {
    root: YU_GI_OH_API_BASE_URL,
    create: `${YU_GI_OH_API_BASE_URL}/post`,
    read: `${YU_GI_OH_API_BASE_URL}/get`, // get all cards
    update: (cardId: number) => `${YU_GI_OH_API_BASE_URL}/patch/${cardId}`,
    delete: (cardId: number) => `${YU_GI_OH_API_BASE_URL}/delete/${cardId}`,
    details: (cardId: number) => `${YU_GI_OH_API_BASE_URL}/get/${cardId}`, // get specific card
}

const emailApi = {
    verifyEmail: (tokenId: string) => `${EMAIL_API_BASE_URL}/verify-email?token=${tokenId}`,
}

const user = {
    profile: `/user/profile`,
    account: `/user/account`,
}

const nextAuth = {
    nextAuthApiRoute: "/api/auth", // next api auth stores all auth routes here
    defaultLoginRedirect: user.profile,
    defaultRegisterRedirect: "/login",
}

const auth = {
    login: "/login",
    register: "/register",
    signOut: "/sign-out",
    verifyEmail: "/emails/verify-email",
}

const publicRoutes = {
    dummy: "",
    index: "/",
    about: "/about-us",
    contact: "/contact-us",
    faqs: "/faqs",
    pricing: "/pricing",
    payment: "/payment",
    maintenance: "/maintenance",
    comingSoon: "/coming-soon",
    error: "/error",
    404: "/error/404",
    500: "/error/500",
    403: "/error/403",
}

const routes = {
    // routes that the app needs
    ...publicRoutes,
    auth,
    user,

    // routes that next auth needs
    nextAuth,

    // used for handling access to routes via middleware
    publicRoutes: Object.values(publicRoutes),
    authRoutes: Object.values(auth),

    // used for making api calls
    api: {
        yugioh: { ...yugiohApi },
        email: { ...emailApi },
    },
}

export default routes
