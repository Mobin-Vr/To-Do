import illsturation from "@/public/icons/pnf.svg";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 text-center">
      <div className="flex max-w-xl flex-col items-center justify-center gap-4 p-10">
        <h1 className="text-4xl font-thin text-gray-700">
          This list could not be found :(
        </h1>

        <div className="flex items-center justify-center">
          <Image
            src={illsturation}
            alt="not-found"
            className="mx-auto h-52 w-52 sm:h-64 sm:w-64"
          />
        </div>

        <div className="flex w-full cursor-pointer justify-center">
          <Link
            href="/tasks"
            className="w-1/2 rounded-lg bg-blue-600 px-4 py-2 text-center font-normal text-white transition hover:bg-blue-700"
          >
            Back to tasks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
