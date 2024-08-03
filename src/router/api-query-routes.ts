/* API ROUTES FOR REACT QUERY */
const API_QUERY_ROUTES = {
    BACKEND_BASE_URL: "http://localhost:3333",
    USER: {
        GET_ALL_USERS_ROUTE: "/user",
        GET_USER_BY_ID: (userid: string) => `/user/${userid}`,
        GET_REGISTER_USER_ROUTE: "/user/register",
        GET_LOGIN_USER_ROUTE: "/user/login",
        GET_USER_PROFILE_ROUTE: (userid: string) => `/user/profile/${userid}`,
        GET_UPDATE_USER_ROUTE: (userid: string) => `/user/update-user/${userid}`,
        GET_DELETE_USER_ROUTE: (userid: string) => `/user/delete-user/${userid}`,
    },
}

export default API_QUERY_ROUTES
