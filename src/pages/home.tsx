import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Navbar from "../components/Navbar";
import Head from "next/head";
import BaseHead from "../components/BaseHead";
import Footer from "../components/Footer";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Disco Wave | Homepage</title>
      </Head>
      <BaseHead />

      <div className="bg-black">
        <Navbar />
        <div className="p-8 space-y-8">
          <div className="flex justify-center w-full">
            <div className="mt-12 max-w-5xl">
              <div className="space-y-12">
                <div className="space-y-2 text-center">
                  <h1 className="md:text-5xl text-3xl ">
                    How to use DiscoWave
                  </h1>
                  <p>
                    Thanks for using DiscoWave! This is a basic guide to get you
                    up and going with the platform.
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-4xl">Visualization</h2>
                  <p>
                    To start with the visualization, head over to the{" "}
                    <a
                      href="/visualization"
                      className="hover:text-gray-400 transition ease-in-out underline"
                    >
                      visualization page
                    </a>{" "}
                    (Pro tip: This can also be found the navigation bar at the
                    top of the page. It's the one that has the cool audio waves
                    and is to the right of the home icon)
                  </p>
                  <img
                    src="/mic_demo.png"
                    alt="Request for microphone input"
                    width="auto"
                    height="auto"
                  />
                  <p>
                    When you reach the page, you'll find a prompt that asks you
                    for your microphone. Note that this is solely for the
                    visualization aspect of DiscoWave. We do not store this
                    microhphone data in any shape or form. Read our{" "}
                    <a
                      href="/privacy-policy"
                      className="hover:text-gray-400 transition ease-in-out underline"
                    >
                      privacy policy
                    </a>{" "}
                    to find out more about this. If you choose to allow it, an
                    awesome audio visualization will come up, which syncs with
                    the audio. If you are the DJ, please put your microhphone
                    somewhere close to the speakers but not so much that you see
                    all the lines on the visualization just spike up to the max
                    but not such that the lines stay small.
                  </p>
                  <p>
                    Now, there are different forms of the visualizations. You
                    can use the green button at the bottom of the page to switch
                    between the two
                  </p>
                  <div>
                    <div className="flex justify-center">
                      <img
                        src="toggle_button.png"
                        alt="Toggle button to switch between the two visualizations"
                        width="auto"
                        height="auto"
                      />
                    </div>
                    <p className="text-xs text-gray-400 text-center">
                      Photo of the green button to switch between the two
                      visualizations
                    </p>
                  </div>

                  <div className="flex md:flex-row flex-col space-x-2">
                    <div className="text-center">
                      <img
                        src="visualization_graph.png"
                        alt="Graph-form of the visualization"
                        width="auto"
                        height="auto"
                      />
                      <p className="text-xs text-gray-400">
                        Graph form of visualization
                      </p>
                    </div>

                    <div className="text-center">
                      <img
                        src="visualization_sphere.png"
                        alt="Circle/Ray/Sphere-form of the visualization"
                        width="auto"
                        height="auto"
                      />
                      <p className="text-xs text-gray-400">
                        Circle/Ray/Sphere form of visualization
                      </p>
                    </div>
                  </div>
                  <p>
                    Great! Now when you talk, the waves/rays should go up and
                    down! Next up, we're going to talk about community
                    suggestions.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl md:text-4xl">
                    Community Suggestions
                  </h2>
                  <p>
                    It's always very tough for party-goers to suggest their
                    favorite songs. They have to scream in the DJ's ear over the
                    loud music just to listen to the tunes they enjoy. Well
                    that's not an issue anymore. Just turn on the feature for
                    Community Suggestions and you're good. Community Suggestions
                    allow your guests to scan a QR Code to suggest songs.
                  </p>
                  <div className="flex justify-center">
                    <img
                      src="/suggestions_initial_screen.png"
                      alt="Initial screen of community suggestions"
                      width="auto"
                      height="auto"
                    />
                  </div>
                  <p>
                    There will be a tile that shows the contents of the image
                    above on the visualization page. Click the button that says
                    "Setup Suggestions" to get started with the setup process.
                  </p>
                  <div className="flex justify-center">
                    <img
                      src="/suggestions_setup.png"
                      alt="Setup process of Community Suggestions"
                      width="auto"
                      height="auto"
                    />
                  </div>
                  <p>
                    A setup screen like the one above will popup where you can
                    enter the session password. This password is shown to your
                    guests so they can submit suggestions (and not anyone else
                    who doesn't know the password). Do NOT use a password you
                    have used before in any of your other online accounts as
                    party guests will be able to see this.
                  </p>
                  <div className="flex justify-center">
                    <img
                      src="/suggestions_photo.png"
                      alt="Scannable QRCode and password for party guests"
                      width="auto"
                      height="auto"
                    />
                  </div>
                  <p>
                    After that, a QRCode and session password will show up in
                    replacement of the setup button. You should be good to go
                    now! Guests can just scan that to request their songs.
                  </p>
                  <div className="flex justify-center">
                    <img
                      src="/suggestions_showcase.png"
                      alt="Scannable QRCode and password for party guests"
                      width="auto"
                      height="auto"
                    />
                  </div>
                  <p>
                    Then, users' suggestions will show up on the visualization
                    page itself. To get rid of suggestions, tap the "X" in the
                    top right of one of the suggestions to delete it. This will
                    take a second to delete itself, so don't worry.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl md:text-4xl">Spotify Integration</h2>
                  <p>
                    With the Spotify Integration feature, you can play a song on
                    spotify and users will see live feedback on the song's name,
                    cover art, artists, and playback position.
                  </p>
                  <div className="flex justify-center">
                    <img
                      src="/spotify_integration_demo.png"
                      alt="Showcase of spotify integration"
                      width="auto"
                      height="auto"
                    />
                  </div>
                  <p>
                    Above is shown the integration feature with Spotify. Simply
                    play a song on Spotify (with the same account you used to
                    login to DiscoWave) and it will update on screen so all of
                    your party guests to acknowledge.
                  </p>
                  <p>
                    Note: this option is only available if you play the music
                    through Spotify. If you use another streaming service or
                    play the music from a CD, it will not update here.
                  </p>
                </div>

                <div className="space-y-2 text-center">
                  <h2 className="text-2xl md:text-4xl">
                    Thanks for using reading through this and using DiscoWave!
                  </h2>

                  <p>
                    If you've read this far, do{" "}
                    <a
                      href="/privacy-policy"
                      className="hover:text-gray-400 transition ease-in-out underline"
                    >
                      check us out on GitHub
                    </a>
                    ! Our project is completely open source, which means we
                    won't and will not do anything bad with your data. If you're
                    a developer, you can always open up a pull request to
                    improve DiscoWave!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
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
