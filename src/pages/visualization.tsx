import { getSession } from "next-auth/client";
import { useState } from "react";
import { IoVolumeMuteOutline } from "react-icons/io5";
import useSWR from "swr";
import Modal from "../components/Modal";
import QRCode from "react-qr-code";

const fetcher = async (input: RequestInfo, init: RequestInit, ...args) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Vizualization({ initialData, url }) {
  const [modalStatus, setModalStatus] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessionPassword, setSessionPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { data, error } = useSWR("/api/current_song", fetcher, {
    initialData,
    refreshInterval: 1000,
  });

  function setupSession(e) {
    setSessionPassword(e.target.password.value);
    fetch("/api/session/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        password: e.target.password.value,
      },
    })
      .then((res) => res.json())
      .then((res) => setSessionId(res.session_id));
    setModalStatus(false);
    e.preventDefault();
  }

  return (
    <>
      <div className="z-0">
        <Modal defaultOpen={modalStatus} setDefaultOpen={setModalStatus}>
          <div className="space-y-3">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl md:text-4xl">
                Setup community suggestions
              </h2>
              <p className="text-sm sm:text-base">
                This is the setup process to allow people at your party to
                submit song suggestions. The way these suggestions arrive to
                you, the DJ is through a concept of "Suggestion sessions." These
                sessions will need a password so only people who know that
                password can add suggestions.
              </p>
            </div>
            <form className="space-y-4" onSubmit={setupSession}>
              <div className="flex flex-col space-y-1 w-max">
                <label className="text-sm font-semibold" htmlFor="password">
                  Session password:
                </label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="Password"
                  className="bg-gray-700 border-1 h-8 pl-3 rounded-lg border-gray-900 text-sm sm:text-base"
                />
                <div className="space-x-2 flex items-center">
                  <input
                    onChange={() => {
                      setShowPassword(!showPassword);
                    }}
                    type="checkbox"
                  />
                  <label htmlFor="showpass">Show password</label>
                </div>
              </div>
              <input
                className="cursor-pointer w-min bg-accent-tertiary hover:bg-accent-tertiary-darker transition ease-in-out px-6 py-3 rounded-lg text-white"
                type="submit"
                value="Setup"
              />
            </form>
          </div>
        </Modal>

        <div className="p-6 flex flex-col space-y-6 md:space-y-0 md:flex-row items-center">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-sm space-y-4">
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
            <div className="flex items-center justify-center space-x-3">
              <small className="w-12 flex justify-center">
                {data.currentMS
                  ? new Date(data.currentMS).toISOString().slice(14, 19)
                  : "--:--"}
              </small>

              <div className={`w-full`}>
                <div className={` bg-gray-300 h-2 w-full rounded-xl`}>
                  <div
                    className="bg-gray-500 h-2 rounded-full"
                    style={{
                      width: `${
                        data.currentMS && data.playBackResult.duration_ms
                          ? (data.currentMS /
                              1000 /
                              (data.playBackResult.duration_ms / 1000)) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
              <small className="w-12">
                {data.playBackResult
                  ? new Date(data.playBackResult.duration_ms)
                      .toISOString()
                      .slice(14, 19)
                  : "--:--"}
              </small>
            </div>
          </div>
          <div className="md:w-full md:flex md:justify-end">
            <div className="bg-gray-900 rounded-lg p-3 space-y-4">
              <h4>
                {sessionId ? "Scan to request song" : "Setup Song Suggestions"}
              </h4>
              <div className="flex flex-col justify-center space-y-3">
                {sessionId ? (
                  <QRCode
                    value={`http://${url}/suggestion/create?session_id=${sessionId}`}
                  />
                ) : (
                  ""
                )}
                <p>{sessionId}</p>
                <button
                  className={`${
                    sessionId ? "hidden" : ""
                  } bg-gray-700 hover:bg-gray-800 transition ease-in-out p-2 rounded-lg text-white`}
                  onClick={() => setModalStatus(true)}
                >
                  Setup Suggestions
                </button>

                <p className={`${sessionId ? "" : "hidden"}`}>
                  Password is:&nbsp;&nbsp;
                  <code className="text-sm">{sessionPassword}</code>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-7"></div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { getCurrentSong } = require("../pages/api/current_song");
  const session = await getSession(context);
  let initialData = await getCurrentSong(session.accessToken);
  if (initialData == undefined) {
    initialData = null;
  }
  if (initialData.currentMS === undefined) {
    initialData.currentMS = null;
  }
  let url;
  if (req) {
    url = req.headers.host;
  }
  console.log(url);
  return { props: { initialData, url } };
}
