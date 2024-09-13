import type { toast as reactHotToast } from "react-hot-toast"
import type { AuthResponse } from "src/types/auth/auth-response"

type HandleAuthResponseParams = {
    redirectTo?: string
    response: AuthResponse
    toast: typeof reactHotToast
}

export default function handleAuthResponse(params: HandleAuthResponseParams) {
    const { redirectTo, response, toast } = params

    switch (response.status) {
        case 400: // error
        case 403: // unauthorized
        case 404: // page not found
        case 500: // internal server error
        case 503: // service unavailable
            toast.error(response.error, { duration: 5000 })
            return
        case 200: // success
        case 201: // created successfully
            toast.success(response.success)

            // TODO: temporary fix for refreshing session
            // force all components to recognize the change in auth status
            if (redirectTo) window.location.href = redirectTo
            break
        default:
            console.error("Unknown HTTP Status Code From Login")
            break
    }
}
