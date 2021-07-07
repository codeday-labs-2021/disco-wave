import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

function Spotify(options) {
  return {
    id: 'spotify',
    name: 'Spotify',
    type: 'oauth',
    version: '2.0',
    scope: encodeURIComponent('user-read-email user-read-playback-state'),
    params: { grant_type: 'authorization_code' },
    accessTokenUrl: 'https://accounts.spotify.com/api/token',
    authorizationUrl:
      'https://accounts.spotify.com/authorize?response_type=code',
    profileUrl: 'https://api.spotify.com/v1/me',
    profile(profile) {
      console.log(profile)
      return {
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        image: profile.images?.[0]?.url,
      }
    },
    ...options,
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id
        token.accessToken = account.accessToken
        token.refreshToken = account.refreshToken
      }
      return token
    },
    async session(session, token) {
      // expose user id and accessToken
      return Promise.resolve({
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: { ...session.user, id: token.sub },
      })
    },
  },
})