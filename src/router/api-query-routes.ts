/* API ROUTES FOR REDUX TOOLKIT QUERY */
export const api_routes = {
  user: {
    get_user_by_userid_route: (userid: string) => `/user/${userid}`,
    get_all_users_route: '/user/',
    get_register_user_route: '/user/register',
    get_login_user_route: '/user/login',
    get_user_profile_route: (userid: string) => `/user/profile/${userid}`,
    get_update_user_route: (userid: string) => `/user/update-user/${userid}`,
    get_delete_user_route: (userid: string) => `/user/delete-user/${userid}`,
  },
}
