import Image from "next/image";
import SpotifyIntegrationImage from "../../../../public/spotify_integration_demo.png";

export default function SpotifyIntegration() {
  return (
    <div>
      <div className="flex items-center space-y-4 md:space-y-0 md:space-x-12">
        <div className="p-2 hidden sm:block select-none">
          <Image
            src={SpotifyIntegrationImage}
            width={409}
            height={261}
            layout="intrinsic"
            alt="spotify integration"
          />
        </div>

        <div>
          <h2 className="space-y-2">
            Seamless <span className="text-accent-spotify">Spotify</span>{" "}
            Integration
          </h2>
          <p className="max-w-xl">
            If you, the DJ, use Spotify, party guests can see the current
            playing song and duration of the currently playing song! No more
            wondering how much of the song is left if you don't like it; it's
            right there!
          </p>
        </div>
      </div>
    </div>
  );
}
