import Image from "next/image";

export default function CommunitySuggestions() {
  return (
    <div>
      <div className="flex items-center space-y-4 md:space-y-0 md:space-x-12">
        <div className="p-2 hidden sm:block select-none">
          <Image
            src="/suggestions_photo.png"
            width={263}
            height={322}
            layout="intrinsic"
            alt="community suggestions"
          />
        </div>

        <div>
          <h2 className="space-y-2">
            An <span className="text-accent-tertiary">Easy</span> way to suggest
            songs
          </h2>
          <p className="max-w-xl">
            No more hollering in the DJ's ear to request a song you like. Just
            simply scan the QR Code on the screen and submit your song request!
            Your suggestion will come up on screen and your DJ notice it;
            without any hassle :)
          </p>
        </div>
      </div>
    </div>
  );
}
