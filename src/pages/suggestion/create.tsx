import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "next/head";

const CreateSuggestion = () => {
  const [render, setRender] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { query } = useRouter();
  const router = useRouter();

  useEffect(() => {
    const verifyUrl = async () => {
      if (router.isReady) {
        const response = await fetch("/api/session/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            session_id: query.session_id.toString(),
          },
        });

        if (response.status === 500) {
          router.push("/suggestion/error");
          return;
        }

        setRender(true);
      }
    };
    verifyUrl();
  }, [query.session_id]);

  function addSuggestion(e) {
    if (e.target.suggestion.value.trim() === "") {
      toast.error("🤔 You didn't provide a suggestion!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      e.preventDefault();
      return;
    }
    fetch("/api/session/suggestion/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        session_id: query.session_id.toString(),
        password: e.target.password.value,
        suggestion: e.target.suggestion.value,
      },
    }).then((res) => {
      if (res.status === 403) {
        toast.error("🔒 Invalid password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.status === 200) {
        toast.success("🔓 Suggestion Added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
    //alert("suggestion added");
    e.preventDefault();
  }
  return render ? (
    <>
      <div className="p-6 flex justify-center">
        <ToastContainer />
        <div className="space-y-6 ">
          <h2>Suggest a song</h2>
          <form
            className="space-y-4 flex flex-col max-w-xl"
            onSubmit={addSuggestion}
          >
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="suggestion">
                Your song suggestion
              </label>
              <input
                type="text"
                name="suggestion"
                placeholder="Suggestion"
                className="bg-gray-700 border-1 h-10 pl-3 rounded-lg border-gray-900 text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="password">
                The password your DJ set. Listed under QR Code
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                className="bg-gray-700 border-1 h-10 pl-3 rounded-lg border-gray-900 text-sm sm:text-base"
              />
            </div>
            <div className="space-x-2 flex items-center">
              <input
                onChange={() => {
                  setShowPassword(!showPassword);
                }}
                type="checkbox"
              />
              <label htmlFor="showpass">Show password</label>
            </div>
            <input
              className="cursor-pointer w-min bg-accent-tertiary hover:bg-accent-tertiary-darker transition ease-in-out px-6 py-3 rounded-lg text-white"
              type="submit"
              value="Suggest"
            />
          </form>
        </div>
      </div>
      <Head>
        <title>Disco Wave | Create Suggestion</title>
        <meta
          property="og:url"
          content="https://disco-wave.vercel.app/suggestion/create"
        />
      </Head>
    </>
  ) : (
    <>
      <Head>
        <title>Disco Wave | Create Suggestion</title>
        <meta
          property="og:url"
          content="https://disco-wave.vercel.app/suggestion/create"
        />
      </Head>
    </>
  );
};

export default CreateSuggestion;

// export async function getServerSideProps({ query }, res) {
//   //get the request and result from the context
// }
