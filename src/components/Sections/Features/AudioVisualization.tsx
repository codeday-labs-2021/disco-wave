import Image from "next/image";
import VisualizationCloseUp from "../../../../public/visualization_closeup.gif";

export default function AudioVisualization() {
  return (
    <div>
      <div className="flex items-end space-y-4 md:space-y-0 md:space-x-12">
        <div>
          <h2 className="space-y-2">
            <span className="text-accent-secondary">Awesome</span> Audio
            Visualizations
          </h2>
          <p className="max-w-xl">
            Hype up your party with powerful audio waves, that are synced to the
            music*. Choose from two styles of audio visualizations to suit your
            needs. Your next party is going to be a blast!**
            <br />
            <small className="text-xs text-gray-500">
              *Synchronization occurs through microphone. If you're concerned
              about your privacy (rightfully so), check out our{" "}
              <a className="underline" href="#">
                privacy policy
              </a>{" "}
            </small>
          </p>
        </div>
        <div className="p-2 hidden sm:block ">
          <Image
            src={VisualizationCloseUp}
            width={400}
            height={300}
            layout="intrinsic"
            alt="spotify integration"
          />
        </div>
      </div>
    </div>
  );
}
