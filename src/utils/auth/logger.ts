import type { LoggerInstance } from "@auth/core/types"

const logger: LoggerInstance = {
    error(error: Error) {
        console.error("Next Auth Console Error", { error })
    },
    warn(code) {
        console.warn("Next Auth Console Warning", { code })
    },
    debug(code, metadata) {
        console.debug("Next Auth Console Debug", { code }, { metadata })
    },
}

export default logger
