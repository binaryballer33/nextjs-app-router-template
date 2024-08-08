import dynamoose from "dynamoose"

import { AWS_ACCESS_KEY_ID, AWS_DYNAMO_DB_TABLE_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "src/utils/secrets"

// Create new DynamoDB instance allowed to access the DynamoDB table in your aws account for this region
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: AWS_REGION,
})

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb)

// Define Dynamoose schema
const YuGiOhCardDynamooseSchema = new dynamoose.Schema({
    id: Number,
    price: Number,
    imageUrl: String,
    name: String,
    type: String,
    frameType: String,
    desc: String,
    race: String,
    archetype: {
        type: String,
        required: false,
    },
    ygoprodeck_url: String,
    banlist_info: {
        type: Object,
        schema: {
            ban_goat: {
                type: String,
                required: false,
            },
            ban_ocg: {
                type: String,
                required: false,
            },
            ban_tcg: {
                type: String,
                required: false,
            },
        },
        required: false,
    },
    card_sets: {
        type: Array,
        schema: [
            {
                type: Object,
                schema: {
                    set_name: String,
                    set_code: String,
                    set_rarity: String,
                    set_rarity_code: String,
                    set_price: String,
                },
            },
        ],
        required: false,
    },
    card_images: {
        type: Array,
        schema: [
            {
                type: Object,
                schema: {
                    id: Number,
                    image_url: String,
                    image_url_small: String,
                    image_url_cropped: String,
                },
            },
        ],
    },
    card_prices: {
        type: Array,
        schema: [
            {
                type: Object,
                schema: {
                    cardmarket_price: String,
                    tcgplayer_price: String,
                    ebay_price: String,
                    amazon_price: String,
                    coolstuffinc_price: String,
                },
            },
        ],
    },
    misc_info: {
        type: Array,
        schema: [
            {
                type: Object,
                schema: {
                    beta_name: String,
                    views: Number,
                    viewsweek: Number,
                    upvotes: Number,
                    downvotes: Number,
                    formats: {
                        type: Array,
                        schema: [String],
                    },
                    tcg_date: String,
                    ocg_date: String,
                    konami_id: Number,
                    has_effect: Number,
                    md_rarity: String,
                },
            },
        ],
        required: false,
    },
    linkval: {
        type: Number,
        required: false,
    },
    linkmarkers: {
        type: Array,
        schema: [String],
        required: false,
    },
    attribute: {
        type: String,
        required: false,
    },
    atk: {
        type: Number,
        required: false,
    },
    def: {
        type: Number,
        required: false,
    },
    level: {
        type: Number,
        required: false,
    },
    pend_desc: {
        type: String,
        required: false,
    },
    monster_desc: {
        type: String,
        required: false,
    },
    scale: {
        type: Number,
        required: false,
    },
})

// Create Dynamoose model
const YuGiOhCardDynamooseModel = dynamoose.model(AWS_DYNAMO_DB_TABLE_NAME, YuGiOhCardDynamooseSchema)

export default YuGiOhCardDynamooseModel
