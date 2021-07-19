import { getSession } from "next-auth/client";
var SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

export async function getCurrentSong(accessToken) {
  spotifyApi.setAccessToken(accessToken);
  let data = await spotifyApi.getMyCurrentPlaybackState().then(function(data) {
    // Output items
    if (data.body && data.body.is_playing) {
      return {playBackResult: data.body.item, currentMS: data.body.progress_ms}
    } else {
      return {playBackResult: null};
    }
  }, function(err) {
    console.log('Something went wrong!', err);
  });
  return data;
}

export default async function resolver(req, res) {
  const session = await getSession({ req });
  const data = await getCurrentSong(session.accessToken)
  res.json(data);
}
