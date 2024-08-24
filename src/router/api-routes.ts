/* API ROUTES FOR REACT QUERY */

const BACKEND_BASE_URL = "http://localhost:3333"

const API_ROUTES = {
    // User Routes
    USER: {
        REGISTER_USER_ROUTE: "/user/register",
        LOGIN_USER_ROUTE: "/user/login",
        GET_ALL_USERS_ROUTE: "/user",
        GET_USER_BY_ID: (userid: string) => `/user/${userid}`,
        GET_USER_PROFILE_ROUTE: (userid: string) => `/user/profile/${userid}`,
        UPDATE_USER_ROUTE: (userid: string) => `/user/update-user/${userid}`,
        DELETE_USER_ROUTE: (userid: string) => `/user/delete-user/${userid}`,
    },

    // Yu-Gi-Oh Routes
    CREATE_YUGIOH_CARD: "/yu-gi-oh/create-card",
    // TODO: get all cards and store them in supabase database and access using prisma orm
    GET_ALL_YUGIOH_CARDS: "http://localhost:3333/yu-gi-oh",
    GET_YUGIOH_CARD_BY_ID: (id: number) => `${BACKEND_BASE_URL}/yu-gi-oh/${id}`,
    UPDATE_YUGIOH_CARD_BY_ID: (id: number) => `${BACKEND_BASE_URL}/yu-gi-oh/update-card/${id}`,
    DELETE_YUGIOH_CARD_BY_ID: (id: number) => `${BACKEND_BASE_URL}/yu-gi-oh/delete-card/${id}`,

    // TODO: routes not working yet, integrating yugioh cards from api first
    // Pokémon Routes
    CREATE_POKEMON_CARD: "/pokemon/create-card",
    GET_ALL_POKEMON_CARDS: `${BACKEND_BASE_URL}/pokemon`,
    GET_POKEMON_CARD_BY_ID: (id: number) => `${BACKEND_BASE_URL}/pokemon/${id}`,
    UPDATE_POKEMON_CARD_BY_ID: (id: number) => `${BACKEND_BASE_URL}/pokemon/update-card/${id}`,
    DELETE_POKEMON_CARD_BY_ID: (id: number) => `${BACKEND_BASE_URL}/pokemon/delete-card/${id}`,
}

export default API_ROUTES
