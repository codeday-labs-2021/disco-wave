import {getSession} from 'next-auth/client'
var SpotifyWebApi = require('spotify-web-api-node');


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

export default async function resolver(req,res){
  const session = await getSession({req});
  spotifyApi.setAccessToken(session.accessToken);

  spotifyApi.getMyCurrentPlayingTrack()
  .then(function(data){
    res.send('Now playing ' + data.body.item.name)
  }, function(err) {
    res.send('Error')
});
}





