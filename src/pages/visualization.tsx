import { getSession } from "next-auth/client";
import {IoVolumeMuteOutline} from 'react-icons/io5'
import useSWR from 'swr'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Vizualization({initialData}) {
  const { data, error } = useSWR('/api/current_song', fetcher, {initialData})

  return <div>
    <div className="m-6 bg-gray-900 rounded-lg p-3 w-max space-y-4">
      <h4>Now Playing</h4>
      <div className="flex space-x-4 items-center">
        {data ? <img className="w-28 h-28 rounded-lg" src={data.album.images[0].url}/> : <div className="bg-gray-600 w-28 h-28 rounded-lg flex justify-center items-center"><IoVolumeMuteOutline fontSize="3rem"/></div>}
        <div className="text-lg font-bold">{data ? <div>{data.name} <p className="font-normal">by {data.artists.map((artist)=>{return artist.name})}</p></div> : "User is not playing a song!"}</div>
      </div>
    </div>
  </div>;
}

export async function getServerSideProps(context) {
  const { getCurrentSong } = require("../pages/api/current_song");
  const session = await getSession(context);
  let initialData = await getCurrentSong(session.accessToken);
  if(initialData == undefined){
      initialData = null;
  }
  
  return {props: {initialData}}
}
