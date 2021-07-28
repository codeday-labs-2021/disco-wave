import { getSession } from "next-auth/client";
import { useState } from "react";
import { IoVolumeMuteOutline } from "react-icons/io5";
import useSWR from "swr";
import Modal from "../components/Modal";
import { HiX } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "next/head";
import BaseHead from "../components/BaseHead";
import VisualizationComponent from "../components/VisualizationComponent";

const fetcher = async (input: RequestInfo, init: RequestInit, ...args) => {
  const res = await fetch(input, init);
  return res.json();
};

const reqsFetcher = async (
  url: string,
  password: string,
  session_id: string
) => {
  if (!url || !password || !session_id) {
    return [];
  }

  const res = await fetch("/api/session/suggestion/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      session_id,
      password,
    },
  });

  return res.json();
};

export default function Vizualization({ initialData, url }) {
  const [modalStatus, setModalStatus] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessionPassword, setSessionPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState(null);

  const { data, error } = useSWR("/api/current_song", fetcher, {
    initialData,
    refreshInterval: 1000,
  });
  let { data: reqData, error: reqError } = useSWR(
    ["/api/session/verify", sessionPassword, sessionId],

    reqsFetcher,
    {
      initialData: [],
      refreshInterval: 1000,
    }
  );

  function setupSession(e) {
    fetch("/api/session/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        password: e.target.password.value,
        admin_password: e.target.adminpassword.value,
      },
    })
      .then((res) => res.json())
      .then((res) => setSessionId(res.session_id));
    setSessionPassword(e.target.password.value);
    setAdminPassword(e.target.adminpassword.value);
    setModalStatus(false);
    e.preventDefault();
  }

  return (
    <>
      <BaseHead />
      <Head>
        <title>Disco Wave | Visualization</title>
      </Head>

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
              <div className="flex flex-col space-y-4 w-max">
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
                <div className="flex flex-col space-y-1 w-max">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="adminpassword"
                  >
                    Admin password (This is used to deleted suggestions):
                  </label>
                  <input
                    type={`${showAdminPassword ? "text" : "password"}`}
                    name="adminpassword"
                    placeholder="Admin Password"
                    className="bg-gray-700 border-1 h-8 pl-3 rounded-lg border-gray-900 text-sm sm:text-base"
                  />
                  <div className="space-x-2 flex items-center">
                    <input
                      onChange={() => {
                        setShowAdminPassword(!showAdminPassword);
                      }}
                      type="checkbox"
                    />
                    <label>Show Admin password</label>
                  </div>
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
        <ToastContainer />
        <div className="p-6 md:grid md:grid-cols-3 gap-4 flex flex-col space-y-6 md:space-y-0 md:flex-row items-center">
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
                    You're not playing a song on Spotify!
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
          <div>
            <div
              className={`bg-gray-900 rounded-lg p-6 w-full max-w-sm space-y-4 ${
                reqData.length <= 0 ? "hidden" : ""
              }`}
            >
              <h4>Current Suggestions</h4>
              <ul
                className={`${
                  sessionId ? "" : "hidden"
                } max-h-48 overflow-scroll space-y-2 pl-6`}
              >
                {reqData.length > 0
                  ? reqData.map((req, i) => {
                      return (
                        <li
                          key={i}
                          className="bg-gray-700 rounded-lg p-3 relative space-y-2"
                        >
                          <div className="flex w-full border-b border-gray-500 pb-1">
                            <p className="mt-1 ml-1">{i + 1}.</p>
                            <div className="w-full flex justify-end">
                              <button
                                onClick={() => {
                                  fetch("/api/session/suggestion/remove", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                      session_id: sessionId,
                                      song: i,

                                      admin_password: adminPassword,
                                    },
                                  }).then((res) => {
                                    if (res.status === 403) {
                                      toast.error(
                                        "Oh no we couldn't remove the song! ",
                                        {
                                          position: "top-right",
                                          autoClose: 5000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                        }
                                      );
                                    }
                                  });
                                }}
                                className="p-1 hover:bg-gray-600 transition ease-in-out rounded-full"
                              >
                                <HiX fontSize="1.5rem" />
                              </button>
                            </div>
                          </div>
                          <div>{req}</div>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="bg-gray-900 rounded-lg p-6 space-y-4 w-max">
              <h4>
                {sessionId ? "Scan to request song" : "Setup Song Suggestions"}
              </h4>
              <div className="flex flex-col justify-center text-center space-y-3">
                <div
                  className={`${
                    sessionId ? "" : "hidden"
                  } flex w-full justify-center`}
                >
                  {sessionId ? (
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=http://${url}/suggestion/create?session_id=${sessionId}&size=170x170`}
                      alt={`https://${url}/suggestion/create?session_id=${sessionId}`}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <button
                  className={`${
                    sessionId ? "hidden" : ""
                  } w-full bg-gray-700 hover:bg-gray-800 transition ease-in-out p-2 rounded-lg text-white`}
                  onClick={() => setModalStatus(true)}
                >
                  Setup Suggestions
                </button>

                <div className="">
                  <p>{sessionId}</p>
                  <p className={`${sessionId ? "" : "hidden"}`}>
                    Password is:&nbsp;&nbsp;
                    <code className="text-sm">{sessionPassword}</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <VisualizationComponent />
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

  return { props: { initialData, url } };
}
