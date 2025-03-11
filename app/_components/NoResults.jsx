"use client";

import noResultIllustration from "@/public/icons/search.svg";
import Image from "next/image";
import MenuBtn from "./_ui/MenuBtn";

export default function NoResults({ query, bgColor }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center gap-4 p-10 text-center"
      style={{ backgroundColor: bgColor.mainBackground }}
    >
      <div className="flex max-w-xl flex-col items-center justify-center gap-4 p-10 text-center">
        <MenuBtn className="absolute left-5 top-5" bgColor={bgColor} />

        <h1
          className="text-4xl font-thin"
          style={{ color: bgColor.primaryText }}
        >
          No results found !
        </h1>

        <div className="flex items-center justify-center">
          <Image
            src={noResultIllustration}
            alt="no-results-illustration"
            className="mx-auto h-52 w-52 sm:h-64 sm:w-64"
          />
        </div>

        <p
          className="text-base font-light"
          style={{ color: bgColor.primaryText }}
        >
          We couldn&apos;t find any matches for &quot;{query}&quot;.
          <br />
          Try with different keywords.
        </p>

        <div className="flex w-full cursor-pointer justify-center">
          <button
            onClick={() => window.history.back()}
            className="w-1/2 rounded-lg px-4 py-2 text-center font-normal transition"
            style={{
              backgroundColor: bgColor.toggleBackground,
              color: bgColor.toggleText,
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = bgColor.toggleHover)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = bgColor.toggleBackground)
            }
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
