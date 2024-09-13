import { BACKEND_BASE_URL } from "src/utils/secrets"

// API URLs
const YU_GI_OH_API_BASE_URL = `${BACKEND_BASE_URL}/api/yu-gi-oh`
const EMAIL_API_BASE_URL = `${BACKEND_BASE_URL}/api/emails`

const yugiohApi = {
    create: `${YU_GI_OH_API_BASE_URL}/post`,
    delete: (cardId: number) => `${YU_GI_OH_API_BASE_URL}/delete/${cardId}`,
    details: (cardId: number) => `${YU_GI_OH_API_BASE_URL}/get/${cardId}`, // get specific card
    read: `${YU_GI_OH_API_BASE_URL}/get`, // get all cards
    root: YU_GI_OH_API_BASE_URL,
    update: (cardId: number) => `${YU_GI_OH_API_BASE_URL}/patch/${cardId}`,
}

const emailApi = {
    verifyEmail: (tokenId: string) => `${EMAIL_API_BASE_URL}/verify-email?token=${tokenId}`,
}

const user = {
    account: `/user/account`,
    profile: `/user/profile`,
}

const nextAuth = {
    defaultLoginRedirect: user.profile,
    defaultRegisterRedirect: "/login",
    nextAuthApiRoute: "/api/auth", // next api auth stores all auth routes here
}

const auth = {
    login: "/login",
    register: "/register",
    signOut: "/sign-out",
    verifyEmail: "/emails/verify-email",
}

const publicRoutes = {
    403: "/error/403",
    404: "/error/404",
    500: "/error/500",
    about: "/about-us",
    comingSoon: "/coming-soon",
    contact: "/contact-us",
    dummy: "",
    error: "/error",
    faqs: "/faqs",
    index: "/",
    maintenance: "/maintenance",
    payment: "/payment",
    pricing: "/pricing",
}

const routes = {
    // routes that the app needs
    ...publicRoutes,
    // used for making api calls
    api: {
        email: { ...emailApi },
        yugioh: { ...yugiohApi },
    },
    auth,

    authRoutes: Object.values(auth),

    // routes that next auth needs
    nextAuth,
    // used for handling access to routes via middleware
    publicRoutes: Object.values(publicRoutes),

    user,
}

export default routes
