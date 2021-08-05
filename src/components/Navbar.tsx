import React, { useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { GiSoundWaves } from "react-icons/gi";
import { signOut, useSession } from "next-auth/client";
import { useEffect } from "react";

export default function Navbar() {
  const [session, loading] = useSession();
  const [userPfp, setUserPfp] = useState("");

  useEffect(() => {
    if (session) {
      setUserPfp(session.user.image);
    }
  }, [session]);

  return (
    <div className="flex space-x-4 md:space-x-8 items-center border-b border-gray-300 md:px-4 py-2 font-bold">
      <img
        src="/logo-with-text.svg"
        className="md:block hidden"
        width="200px"
        height="48px"
        alt="Disco Wave Logo"
      />

      <img
        src="/disco-wave-logo.svg"
        width="50px"
        height="50px"
        className="md:hidden"
        alt="Disco Wave Logo"
      />

      <div className="flex divide-x divide-gray-400 items-center">
        <div className="hover:underline pr-4">
          <a href="/home" className="flex items-center space-x-1">
            <p>
              <AiOutlineHome fontSize="1.3rem" />
            </p>

            <p className="md:block hidden">Home</p>
          </a>
        </div>
        <div className="hover:underline pl-4">
          <a href="/visualization" className="flex items-center space-x-1">
            <p>
              <GiSoundWaves fontSize="1.5rem" />
            </p>
            <p className="md:block hidden">Visualization</p>
          </a>
        </div>
      </div>

      <div className="w-full justify-end flex space-x-6">
        {userPfp ? (
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-300"
            src={session.user.image}
          />
        ) : (
          <AiOutlineUser className="w-8 h-8 md:w-10 md:h-10 border border-gray-300 rounded-full" />
        )}
        <button
          className="flex space-x-2 bg-accent-primary hover:bg-accent-primary-darker transition ease-in-out p-2 rounded-lg text-white text-base"
          onClick={() => signOut()}
        >
          <IoLogOutOutline fontSize="1.5rem" /> <div>Logout</div>
        </button>
      </div>
    </div>
  );
}
