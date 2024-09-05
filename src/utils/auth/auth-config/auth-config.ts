import type { AuthConfig } from "@auth/core"
import type { LoggerInstance, PagesOptions } from "@auth/core/types"

import routes from "src/router/routes"
import adapter from "src/utils/auth/auth-config/adapter"
import callbacks from "src/utils/auth/auth-config/callbacks"
import events from "src/utils/auth/auth-config/events"
import providers from "src/utils/auth/auth-config/providers"
import { NODE_ENV } from "src/utils/secrets"

const session: AuthConfig["session"] = { strategy: "jwt" }

const debug: AuthConfig["debug"] = NODE_ENV === "development"

const pages: Partial<PagesOptions> = {
    signIn: routes.auth.login,
    signOut: routes.auth.signOut,
    error: routes.error,
}

const logger: Partial<LoggerInstance> = {
    error(error: Error) {
        console.error("Next Auth Logger: Logging Console Error", { error })
    },
    warn(code) {
        console.warn("Next Auth Logger: Logging Console Warning", { code })
    },
    // can also get metadata from the debug callback
    debug(code) {
        console.debug("Next Auth  Logger: Logging Console Debug", { code })
    },
}

const authConfig: AuthConfig = {
    providers, // define the providers that you want to use with next auth, for example google, facebook, email and pw
    callbacks, // allow you to modify the sign-in process, json web token and session object
    adapter, // next auth uses this to perform crud operations on the user and account tables
    events, // auth events like sign-in, sign out, create/update user, link account, etc
    session, // modify the session's maxAge, strategy, etc
    pages, // customize the pages that are used for the sign in and sign out
    logger, // get information from next auth authentication flow
    debug,
}

export default authConfig
