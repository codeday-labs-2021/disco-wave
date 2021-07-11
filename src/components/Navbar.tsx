import React, { useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import Image from "next/image";
import DiscoWaveLogo from '../../public/disco-wave-logo.svg'

export default function Navbar() {
  const [session, loading] = useSession();
  const [userPfp, setUserPfp] = useState("");

  useEffect(() => {
    if (session) {
      setUserPfp(session.user.image);
    }
  }, [session]);

  return (
    <div className="flex space-x-8 items-center border-b border-gray-300 px-4 py-2 font-bold">
      <Image src={DiscoWaveLogo} width={54} height={54}/>
      <div className="flex divide-x divide-gray-400">
        <div className="hover:underline ">
          <a href="#" className="flex items-center space-x-1">
            <p>
              <AiOutlineHome fontSize="1.3rem" />
            </p>

            <p>Home</p>
          </a>
        </div>
      </div>

      <div className="w-full justify-end flex">
        {userPfp ? (
          <img
            className="w-10 h-10 rounded-full border border-gray-300"
            src={session.user.image}
          />
        ) : (
          <AiOutlineUser className="w-10 h-10 border border-gray-300 rounded-full" />
        )}
      </div>
    </div>
  );
}
