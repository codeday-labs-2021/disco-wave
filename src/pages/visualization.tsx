import { getSession } from "next-auth/client";
import { IoVolumeMuteOutline } from "react-icons/io5";
import useSWR from "swr";

const fetcher = async (input: RequestInfo, init: RequestInit, ...args) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Vizualization({ initialData }) {
  const { data, error } = useSWR("/api/current_song", fetcher, { initialData });

  return (
    <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row items-center">
      <div className="bg-gray-900 rounded-lg p-3 w-full max-w-sm space-y-4">
        <h4>Now Playing</h4>
        <div className="flex space-x-4 items-center">
          {data.playBackResult ? (
            <img
              className="h-20 w-20 md:w-28 md:h-28 rounded-lg"
              src={data.playBackResult.album.images[0].url}
            />
          ) : (
            <div className="bg-gray-600 p-6 w-20 h-20 md:p-8 md:w-28 md:h-28 rounded-lg flex justify-center items-center">
              <IoVolumeMuteOutline className="text-6xl" />
            </div>
          )}
          <div className="text-md sm:text-lg font-bold">
            {data.playBackResult ? (
              <div>
                {data.playBackResult.name}{" "}
                <p className="font-normal">
                  by{" "}
                  {data.playBackResult.artists.map((artist) => {
                    return artist.name;
                  })}
                </p>
              </div>
            ) : (
              <p className="text-md sm:text-lg font-bold">
                User is not playing a song!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="md:w-full md:flex md:justify-end">
        <div className="bg-gray-900 rounded-lg p-3 space-y-4">
          <h4>Scan to request song</h4>
          <div className="flex justify-center">
            <img src="/dummy_qrcode.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getCurrentSong } = require("../pages/api/current_song");
  const session = await getSession(context);
  let initialData = await getCurrentSong(session.accessToken);
  if (initialData == undefined) {
    initialData = null;
  }
  return { props: { initialData } };
}
