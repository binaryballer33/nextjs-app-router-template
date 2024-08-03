const QUERY_KEYS = {
    // user query keys
    GET_ALL_USERS: ["user"],
    GET_USER_BY_ID: (id: string) => ["user", { id }],
    UPDATE_USER_BY_ID: (id: string) => ["user", { id }],
    DELETE_USER_BY_ID: (id: string) => ["user", { id }],
}

export default QUERY_KEYS
