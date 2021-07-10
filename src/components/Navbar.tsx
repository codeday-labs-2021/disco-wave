import React, { useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { useSession } from "next-auth/client";
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
    <div className="flex items-center border-b border-gray-400 p-3 font-bold">
      <div className="flex divide-x divide-gray-400">
        <div className="hover:underline ">
          <a href="#" className="flex items-center space-x-1">
            <p>
              <AiOutlineHome fontSize="2rem" />
            </p>

            <p>Home</p>
          </a>
        </div>
      </div>

      <div className="w-full justify-end flex">
        {userPfp ? (
          <img
            className="w-12 h-12 rounded-full border border-gray-300"
            src={session.user.image}
          />
        ) : (
          <AiOutlineUser className="w-12 h-12 border border-gray-300 rounded-full" />
        )}
      </div>
    </div>
  );
}
