export interface Env {
    NEXT_PUBLIC_SUPABASE_REF_ID?: string
    NEXT_PUBLIC_SUPABASE_URL?: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string

    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?: string

    NEXT_PUBLIC_RAPID_API_KEY?: string
    NEXT_PUBLIC_BACKEND_BASE_URL?: string

    NEXT_PUBLIC_AWS_ACCESS_KEY_ID?: string
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY?: string
    NEXT_PUBLIC_AWS_REGION?: string
    NEXT_PUBLIC_AWS_DYNAMO_DB_TABLE_NAME?: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}
