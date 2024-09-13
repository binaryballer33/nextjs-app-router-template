const QUERY_KEYS = {
    // pokemon query keys
    ALL_POKEMON_CARDS: ["pokemon-cards"],
    DELETE_USER_BY_ID: (id: string) => ["user", { id }],
    // user query keys
    GET_ALL_USERS: ["user"],
    GET_USER_BY_ID: (id: string) => ["user", { id }],

    POKEMON_CARD_BY_ID: (id: number) => ["pokemon-cards", { id }],
    UPDATE_USER_BY_ID: (id: string) => ["user", { id }],

    YU_GI_OH_CARD_BY_ID: (id: number) => ["yu-gi-oh-cards", { id }],
    // yu-gi-oh query keys
    YU_GI_OH_CARDS: ["yu-gi-oh-cards"],
}

export default QUERY_KEYS
