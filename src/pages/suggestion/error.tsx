import Head from "next/head";
import BaseHead from "../../components/BaseHead";

const ErrorSuggestion = () => {
  return (
    <>
      <div className="p-6 flex justify-center">
        <div>
          <h1>Error</h1>
          <p className="text-red-500 textl-xl font-semibold">
            Well oh dear, that suggestion session seems to not exist.
            <br />
            Try again!
          </p>
        </div>
      </div>
      <BaseHead />
      <Head>
        <title>Disco Wave | Visualization</title>
      </Head>
    </>
  );
};

export default ErrorSuggestion;

// export async function getServerSideProps({ query }, res) {
//   //get the request and result from the context
// }
