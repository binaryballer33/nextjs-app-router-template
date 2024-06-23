import root_api from 'src/api/root-api'
import { TLoginSchema, TRegisterSchema } from 'src/models/auth'
import { UpdateUser, User } from 'src/models/user'
import { api_routes } from 'src/router/api-query-routes'

const { user } = api_routes

// user api endpoints being defined here and injected into the root api
const userApi = root_api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, string>({
      query: (userid) => user.get_user_profile_route(userid),
    }),
    register: builder.mutation<User, TRegisterSchema>({
      query: (credentials) => ({
        url: user.get_register_user_route,
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<User, TLoginSchema>({
      query: (credentials) => ({
        url: user.get_login_user_route,
        method: 'POST',
        body: credentials,
      }),
    }),
    updateUser: builder.mutation<User, UpdateUser>({
      query: (user_data) => ({
        url: user.get_update_user_route(user_data.id),
        method: 'PUT',
        body: user_data,
      }),
    }),
    deleteUser: builder.mutation<User, string>({
      query: (user_id) => ({
        url: user.get_delete_user_route(user_id),
        method: 'DELETE',
      }),
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: {} }),
    }),
  }),
})

export default userApi

export const {
  useGetProfileQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi
