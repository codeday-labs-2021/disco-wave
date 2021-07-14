import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Navbar from "../components/Navbar";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className="bg-black">
      <Navbar />
      {!session && (
        <>
          Not signed in <br />
          <button
            className="bg-accent-primary hover:bg-accent-primary-darker transition ease-in-out p-2 rounded-lg text-white"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button
            className="bg-accent-primary hover:bg-accent-primary-darker transition ease-in-out p-2 rounded-lg text-white text-base"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  //get the request and result from the context
  const { req, res } = context;
  //get the session object
  const session = await getSession({ req });

  // see if the user is logged in
  if (!session) {
    //if user is logged in, redirect to homepage
    res.writeHead(302, {
      Location: "/api/auth/signin",
    });
    //end the connection
    res.end();
  }

  //blank return statement because react will yell at me if i dont include a return statement
  return {
    props: {},
  };
}
