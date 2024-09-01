import { BACKEND_BASE_URL } from "src/utils/secrets"

const BASE_PATH = {
    AUTH: "/auth",
    BASE: BACKEND_BASE_URL,
}

const routes = {
    index: "/",
    dummy: "",
    comingSoon: "/coming-soon",
    maintenance: "/maintenance",
    pricing: "/pricing",
    payment: "/payment",
    about: "/about-us",
    contact: "/contact-us",
    faqs: "/faqs",
    403: "/error/403",
    404: "/error/404",
    500: "/error/500",
    auth: {
        login: "/login",
        register: "/register",
        signOut: "/sign-out",
    },
    user: {
        root: `${BASE_PATH.BASE}/user`,
        create: `${BASE_PATH.BASE}/user/create`,
        read: `${BASE_PATH.BASE}/user/read`,
        update: (id: string) => `${BASE_PATH.BASE}/user/${id}/update`,
        delete: (id: string) => `${BASE_PATH.BASE}/user/${id}/delete`,
        cards: `${BASE_PATH.BASE}/user/cards`,
        profile: `${BASE_PATH.BASE}/user/profile`,
        account: `${BASE_PATH.BASE}/user/account`,
    },
    card: {
        root: `${BASE_PATH.BASE}/card`,
        create: `${BASE_PATH.BASE}/card/create`,
        read: `${BASE_PATH.BASE}/card/read`,
        update: (id: string) => `${BASE_PATH.BASE}/card/${id}/update`,
        delete: (id: string) => `${BASE_PATH.BASE}/card/${id}/delete`,
        details: (id: string) => `${BASE_PATH.BASE}/card/${id}`,
    },
}

export default routes
