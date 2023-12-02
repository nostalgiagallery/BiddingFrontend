import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="bg-[#1D2430] max-h-screen  bg-white overflow-hidden">
      <main className="bg-[#1D2430] grid min-h-full place-items-center py-2 px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-300">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="flex flex-col">
            <img
              className=" h-auto  w-auto"
              src="/something-lost.png"
              alt="404"
            />

            <div className=" flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
