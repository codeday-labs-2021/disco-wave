import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
async function refreshAccessToken(session) {
  try {
    var SpotifyWebApi = require('spotify-web-api-node')
    var spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    })
    spotifyApi.setAccessToken(session.accessToken)
    spotifyApi.setRefreshToken(session.refreshToken)
    let refreshedTokens = await spotifyApi.refreshAccessToken().then(
      function (data) {
        console.log(data.body)
        return data.body
      },
      function (err) {
        console.log('Could not refresh access token', err)
      },
    )
    return {
      ...session,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? session.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)
    return {
      ...session,
      error: 'RefreshAccessTokenError',
    }
  }
}
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
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: undefined // If set, new users will be directed here on first sign in
  },
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
        token.accessTokenExpires = Date.now() + account.expires_in * 1000
        token.refreshToken = account.refreshToken
        return token
      }
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      return refreshAccessToken(token)
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