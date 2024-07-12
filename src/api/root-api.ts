import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { BACKEND_BASE_URL } from "src/utils/secrets"

const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
    // Define headers to be added to every request
    prepareHeaders: (headers: Headers) => {
      return headers
    },
  }),
  tagTypes: [],
  endpoints: () => ({}), // define endpoints in their own separate files
})

export default rootApi
