import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="space-y-6 border-t border-gray-600 pt-6">
      <div className="space-y-2">
        <div>
          <Image src={"/logo-with-text.svg"} width={200} height={48} />
        </div>
        <div className="pl-2">
          <div className="w-min">
            <a
              href="https://github.com/codeday-labs/disco-wave"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                fontSize="1.5rem"
                className="hover:text-gray-400 text-gray-500 ease-in-out transition"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-max gap-8">
        <div className="space-y-3">
          <h4>Links</h4>
          <ul className="text-sm space-y">
            <li className="hover:text-gray-400 transition ease-in-out">
              <a href="/">Landing</a>
            </li>

            <li className="hover:text-gray-400 transition ease-in-out">
              <a href="/home">Homepage</a>
            </li>

            <li className="hover:text-gray-400 transition ease-in-out">
              <a href="/visualization">Visualization</a>
            </li>

            <li className="hover:text-gray-400 transition ease-in-out">
              <a href="/auth/signin">Login</a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4>Resources</h4>
          <ul className="text-sm space-y">
            <li className="hover:text-gray-400 transition ease-in-out">
              <a href="/privacy-policy">Privacy Policy</a>
            </li>

            <li className="hover:text-gray-400 transition ease-in-out">
              <a href="/terms">Terms of Service</a>
            </li>

            <li className="hover:text-gray-400 transition ease-in-out">
              <a href="/lawyers.txt">lawyers.txt</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
