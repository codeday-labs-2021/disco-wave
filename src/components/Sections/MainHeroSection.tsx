import Image from "next/image";
import VisualizationDemo from "../../../public/visualization_demo.png";
import DiscoWaveLogo from "../../../public/logo-with-text.svg";

export default function MainHeroSection() {
  return (
    <div className="block items-center md:flex space-y-4 md:space-y-0 md:space-x-12">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <div className="select-none">
            <Image
              src={DiscoWaveLogo}
              width={400}
              height={96}
              alt="DiscoWave Logo"
            />
          </div>
          <h4 className="font-normal text-gray-500">
            Your next party just got a whole lot cooler
          </h4>
        </div>

        <div>
          <a href="/auth/signin">
            <button className="bg-accent-primary hover:bg-accent-primary-darker transition ease-in-out w-full p-2 rounded-lg text-white text-xl ">
              Get Started
            </button>
          </a>
        </div>
      </div>
      <div className="p-2 border border-accent-secondary hidden sm:block">
        <div className="border border-accent-secondary">
          <Image
            src={VisualizationDemo}
            width={800}
            height={410}
            layout="intrinsic"
          />
        </div>
      </div>
    </div>
  );
}
