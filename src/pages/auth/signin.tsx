import { getSession, signIn } from "next-auth/client";
import { FaSpotify } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="flex md:items-center justify-center h-screen bg-black">
      <div className="md:shadow-lg md:rounded-xl md:hover:shadow-2xl md:transition md:ease-in-out md:flex bg-gray-900">
        <div className="bg-cover bg-dj-login bg-center w-full h-1/2  md:h-96 md:w-3/4 md:rounded-l-xl"></div>
        <div className="py-6 space-y-6 px-6">
          <h1 className="text-accent-primary text-4xl md:text-5xl">
            Welcome to DiscoWave
          </h1>
          <p className="text-gray-400 border-t border-gray-400 pt-6">
          Making discos just a little bit cooler!
          </p>
          <button
            className="flex w-full justify-center items-center space-x-3 space-x-4 bg-accent-spotify hover:bg-accent-spotify-darker font-bold py-3 px-6 transition ease-in-out p-2 rounded-full text-white"
            onClick={() => signIn("spotify")}
          >
            <FaSpotify fontSize="2rem"/>
            <span className="text-lg md:text-xl">Sign in with Spotify</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  //get the request and result from the context
  const { req, res } = context;
  //get the session object
  const session = await getSession({ req });

  // see if the user is logged in
  if (session && res && session.accessToken) {
    //if user is logged in, redirect to homepage
    res.writeHead(302, {
      Location: "/",
    });
    //end the connection
    res.end();
  }

  //blank return statement because react will yell at me if i dont include a return statement
  return {
    props: {},
  };
}
