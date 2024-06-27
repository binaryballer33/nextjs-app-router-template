interface OAuthProvider {
  id: 'google' | 'github'
  name: string
  logo: string
}

export const oAuthProviders = [
  {
    id: 'google',
    name: 'Google',
    logo: '/placeholders/logo/google-icon.svg',
  },
  {
    id: 'github',
    name: 'Github',
    logo: '/placeholders/logo/github-icon.svg',
  },
] satisfies OAuthProvider[]
