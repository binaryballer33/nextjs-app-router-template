import axios from "axios"

import routes from "src/routes/routes"

export default async function verifyEmailRequest(tokenId: string) {
    return (await axios.post(routes.api.email.verifyEmail(tokenId))).data
}
