export default function PrivacyPolicy() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h1>Privacy Policy</h1>
        <p>
          DiscoWave understands how important privacy is to users. We wrote this
          Privacy Policy to explain what information we collect through our
          website (https://disco-wave.vercel.app) (the "Site"), how we use,
          process, and share it, and what we're doing to keep it safe. It also
          tells you about your rights and choices with respect to your
          information, and how you can contact us if you have any questions or
          concerns.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3>What information does DiscoWave collect about me?</h3>
          <p>
            We only persist/store data in the form of song suggestions.
            DiscoWave has a feature which utilizes song suggesting, and these
            suggestions are stored in our database. We do NOT collect any other
            data besides that.
          </p>
        </div>

        <div className="space-y-2">
          <h3>Authentication data</h3>
          <p>
            When you login to DiscoWave, you are required to login with Spotify.
            You have to be logged in to use our service. This authentication
            data we get from Spotify is stored in cookies so users don't have to
            keep re-logging in to use DiscoWave. This data is in NO SHAPE OR
            FORM STORED IN OUR DATABASES. This data is strictly stored on the
            client side.
          </p>
        </div>

        <div className="space-y-2">
          <h3>Microphone Data</h3>
          <p>
            On our visualization page, we do offer a visualization solution that
            uses microphone input to do the visualization. This microphone data
            is ONLY for the visualization and is not stored or sold to anyone.
            We do not have access to analyze this data. Our code is on Github so
            you can always check out this link
            (https://github.com/codeday-labs/disco-wave/blob/main/src/components/VisualizationComponent.tsx)
            to check for yourself.
          </p>
        </div>

        <div className="space-y-2">
          <h3>Links</h3>
          <p>
            <a className="underline" href="/">
              Homepage
            </a>
          </p>
          <p>
            <a
              className="underline"
              href="https://github.com/codeday-labs/disco-wave/"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
