const QUERY_KEYS = {
    // user query keys
    GET_ALL_USERS: ["user"],
    GET_USER_BY_ID: (id: string) => ["user", { id }],
    UPDATE_USER_BY_ID: (id: string) => ["user", { id }],
    DELETE_USER_BY_ID: (id: string) => ["user", { id }],

    // pokemon query keys
    ALL_POKEMON_CARDS: ["pokemon-cards"],
    POKEMON_CARD_BY_ID: (id: number) => ["pokemon-cards", { id }],

    // yu-gi-oh query keys
    YU_GI_OH_CARDS: ["yu-gi-oh-cards"],
    YU_GI_OH_CARD_BY_ID: (id: number) => ["yu-gi-oh-cards", { id }],
}

export default QUERY_KEYS
