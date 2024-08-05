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
    // GET_ALL_YUGIOH_CARDS: `${BACKEND_BASE_URL}/yu-gi-oh`,
    // TODO: get all cards and store them in supabase database and acess using prisma orm, host images on own server
    // GET_ALL_YUGIOH_CARDS: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
    // GET_ALL_YUGIOH_CARDS: "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon&misc=yes",
    // GET_ALL_YUGIOH_CARDS: "https://db.ygoprodeck.com/api/v7/cardinfo.php?attribute=water&type=Link%20Monster",
    // GET_ALL_YUGIOH_CARDS: "https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes",
    GET_ALL_YUGIOH_CARDS: "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Dark%20Magician&archetype=Blue-Eyes",
    // GET_ALL_YUGIOH_CARDS: "https://db.ygoprodeck.com/api/v7/cardinfo.php?level=4&attribute=water&sort=atk",
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
