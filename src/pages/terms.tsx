export default function Terms() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h1>Terms of Service</h1>
        <p>
          These are the terms of service (or what you need to follow in order to
          use DiscoWave).
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3>Suggestions</h3>
          <p>
            No suggestion made through the suggestion feature is the
            responsibility of DiscoWave. All suggestions are the responsibility
            of the individual who setup the suggestions.
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
