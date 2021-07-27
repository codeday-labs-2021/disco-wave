import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Disco Wave | Homepage</title>
        <meta property="og:url" content="https://disco-wave.vercel.app" />
      </Head>
      <div className="bg-black">
        <Navbar />
        <p>hi</p>
      </div>
    </>
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
