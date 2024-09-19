import axios from "axios"

import routes from "src/routes/routes"

type VerifyEmailRequest = {
    email: string
    sixDigitCode: string
    token: string
}

export default async function verifyEmailRequest(params: VerifyEmailRequest) {
    const { email, sixDigitCode, token } = params
    return (await axios.post(routes.api.email.verifyEmail(token), { email, sixDigitCode })).data
}
