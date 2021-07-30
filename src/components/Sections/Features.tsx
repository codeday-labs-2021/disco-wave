import AudioVisualization from "./Features/AudioVisualization";
import SpotifyIntegration from "./Features/SpotifyIntegration";

export default function Features() {
  return (
    <div className="space-y-10 md:space-y-28">
      <SpotifyIntegration />
      <AudioVisualization />
    </div>
  );
}
