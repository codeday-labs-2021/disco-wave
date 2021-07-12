import { getSession } from "next-auth/client";
import useSWR from 'swr'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Vizualization({initialData}) {
  const { data, error } = useSWR('/api/current_song', fetcher, {initialData})
  return <div>{data ? `${data.name} by ${data.artists.map((artist)=>{return artist.name})}` : ""}</div>;
}

export async function getServerSideProps(context) {
  const { getCurrentSong } = require("../pages/api/current_song");
  const session = await getSession(context);
  const initalData = await getCurrentSong(session.accessToken);
  return {props: {initalData}}
}
