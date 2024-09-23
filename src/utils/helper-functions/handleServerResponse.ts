import type { toast as reactHotToast } from "react-hot-toast"
import type { ServerResponse } from "src/types/auth/server-response"

import delay from "src/utils/helper-functions/delay"

type HandleAuthResponseParams = {
    redirectTo?: string
    response: ServerResponse
    toast: typeof reactHotToast
}

export default async function handleAuthResponse(params: HandleAuthResponseParams) {
    const { redirectTo, response, toast } = params

    switch (response.status) {
        case 400: // error
        case 403: // unauthorized
        case 404: // page not found
        case 500: // internal server error
        case 503: // service unavailable
            toast.error(response.error, { duration: 5000 })
            break
        case 200: // success
        case 201: // created successfully
            toast.success(response.success)

            // TODO: temporary fix for refreshing session
            // doing the redirect in order to force all components to recognize the change in auth status
            if (redirectTo) {
                // the delay allows time for the toast to display before hard refreshing the page and doing the redirect
                await delay(1500)
                window.location.href = redirectTo
            }
            break
        default:
            console.error("Unknown HTTP Status Code From Login")
            break
    }
}
