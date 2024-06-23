import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserState } from 'src/models/redux/user-state'
import { BACKEND_BASE_URL } from 'src/utils/secrets'

const root_api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
    // Define headers to be added to every request
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as UserState).token
      headers.set('Content-Type', 'application/json')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: [],
  endpoints: () => ({}), // define endpoints in their own separate files
})

export default root_api
