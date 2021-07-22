import { HiX } from "react-icons/hi";

const Modal = ({ children, defaultOpen = false, setDefaultOpen }) => {
  return (
    <div className={`fixed w-full`}>
      <div
        className={`${
          defaultOpen ? "" : "hidden"
        } ease-in-out transition duration-200 flex z-40 backdrop-filter backdrop-blur-sm justify-center items-center h-screen`}
      >
        <div className="max-w-4xl mx-10 shadow-lg bg-gray-800 px-6 py-3 space-y-3 rounded-lg">
          <div className="w-full pb-3 flex justify-end border-b border-gray-500">
            <button
              onClick={() => {
                setDefaultOpen(!defaultOpen);
              }}
              className="p-1 hover:bg-gray-600 transition ease-in-out rounded-full"
            >
              <HiX fontSize="1.5rem" />
            </button>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
