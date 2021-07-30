import Features from "../components/Sections/Features";
import MainHeroSection from "../components/Sections/MainHeroSection";

export default function About() {
  return (
    <div className="flex justify-center mt-10 sm:mt-20 p-4">
      <div className="space-y-12 md:space-y-32">
        <MainHeroSection />
        <Features />
      </div>
    </div>
  );
}
