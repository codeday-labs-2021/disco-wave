import { getSession } from "next-auth/client";
var SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

export async function getCurrentSong(accessToken) {
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.getMyCurrentPlaybackState().then(async function(data) {
    // Output items
    if (data.body && data.body.is_playing) {
      let data = await spotifyApi.getMyCurrentPlaybackState().then(
        function (data) {
          return data.body.item
        },
        function (err) {
          console.log('Something went wrong!', err)
        },
      )
      return data
    } else {
      return "User is not playing anything, or doing so in private."
    }
  }, function(err) {
    console.log('Something went wrong!', err);
  });
  
}

export default async function resolver(req, res) {
  const session = await getSession({ req });
  const data = await getCurrentSong(session.accessToken)
  res.json(data);
}
