/* API ROUTES FOR REACT QUERY */

import { BACKEND_BASE_URL } from "src/utils/secrets"

const YU_GI_OH_API_BASE_URL = `${BACKEND_BASE_URL}/api/yu-gi-oh/`

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
    CREATE_YUGIOH_CARD: `${YU_GI_OH_API_BASE_URL}post`,
    GET_YUGIOH_CARDS: `${YU_GI_OH_API_BASE_URL}get/`,
    GET_YUGIOH_CARD_BY_ID: (id: number) => `${YU_GI_OH_API_BASE_URL}${id}/get`,
    UPDATE_YUGIOH_CARD_BY_ID: (id: number) => `${YU_GI_OH_API_BASE_URL}${id}/patch`,
    DELETE_YUGIOH_CARD_BY_ID: (id: number) => `${YU_GI_OH_API_BASE_URL}${id}/delete`,
}

export default API_ROUTES
