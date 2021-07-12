import {getSession} from 'next-auth/client'
var SpotifyWebApi = require('spotify-web-api-node');

export async function getServerSideProps(context){
  const {req,res} = context;
  const session = await getSession({req});
  spotifyApi.setAccessToken(session.accessToken);
}

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: 'http://www.example.com/callback'
});

spotifyApi.getMyCurrentPlayingTrack()
  .then(function(data){
    console.log('Now playing ' + data.body.item.name)
  }, function(err) {
    console.log('Error')
  });
export{}
