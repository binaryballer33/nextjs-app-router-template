import axios from "axios"

import API_QUERY_ROUTES from "src/router/api-query-routes"

const axiosInstance = axios.create({
  baseURL: API_QUERY_ROUTES.BACKEND_BASE_URL,
})

export default axiosInstance
