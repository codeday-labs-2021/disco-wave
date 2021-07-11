const SpotifyWebApi = require('spotify-web-api-node')

require('dotenv').config()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  redirectUri: process.env.REDIRECT_URL,
  clientSecret: process.env.SPOTIFY_SECRET
})

const spotifyLogin = (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state']
    const authorizeURL = spotifyAuth.createAuthorizeURL(scopes)
  
    res.redirect(authorizeURL)
}

const spotifyCallback = async (req, res) => {
    try {
      const code = req.query.code
      const auth = await spotifyApi.authorizationCodeGrant(code)
      const spotifyApi = new SpotifyWebApi({ accessToken: auth.body.access_token })
  
      spotifyApi.setAccessToken(data.body['access_token']);
      res.redirect(`${process.env.LOCAL_URI}home`)
  
    } catch (error) {
      console.error(error)
    }
  }

const getPlayBackState = (socket) => {
    setInterval(async () => {
        try {
            const result = await spotifyApi.getMyCurrentPlaybackState({})
            if (Object.keys(result.body).length > 0) {
                socket.emit("getPlayBackState", result.body)
            }
        } catch (error) {
            console.error("playbackstate error: " + error)
        }
    }, 2000)
}

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

io.on("connect", socket => {
  getPlayBackState(socket)
})

http.listen(port, () => console.log(`Listening on port ${port}!`))

socket.on("getPlayBackState", data => {
    const spotify = document.querySelector('.spotify')
    const html = `
        <img class="spotify__image" src="${data.item.album.images[2].url}" alt="${data.item.name}">
        <div class="spotify__song">
            <span class="spotify__track">${data.item.name}</span>
            <span class="spotify__artist">${data.item.artists[0].name}</span>
        </div>`
    while (spotify.firstChild) spotify.removeChild(spotify.firstChild)
    spotify.insertAdjacentHTML('afterbegin', html)
})
