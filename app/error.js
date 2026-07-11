"use client";

import { useEffect } from "react";
import Image from "next/image";
import errorIllustration from "@/public/icons/error.svg";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the full error in development only
    if (process.env.NODE_ENV === "development") {
      console.error("[DEV ERROR BOUNDARY]", error);
    }
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 text-center">
      <div className="flex max-w-xl flex-col items-center justify-center gap-4 p-10">
        <h1 className="text-4xl font-thin text-gray-700">
          {isDev ? "Development Error" : "Oops! Something went wrong :("}
        </h1>

        <div className="flex items-center justify-center">
          <Image
            src={errorIllustration}
            alt="error"
            className="mx-auto h-52 w-52 sm:h-64 sm:w-64"
          />
        </div>

        {/* Detailed message only in development */}
        <p className="text-lg text-gray-500">
          {isDev
            ? error.message
            : "An unexpected error occurred. Please try again later."}
        </p>

        {isDev && error.digest && (
          <p className="text-xs text-gray-400">Error ID: {error.digest}</p>
        )}

        <div className="flex w-full cursor-pointer justify-center">
          <button
            onClick={reset}
            className="w-1/2 rounded-lg bg-blue-600 px-4 py-2 text-center font-normal text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
