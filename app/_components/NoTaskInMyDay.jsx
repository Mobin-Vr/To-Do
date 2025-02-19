"use client";

import Image from "next/image";
import taskIllustration from "@/public/nature.svg";

export default function NoTaskInMyDay() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-fit w-fit -translate-y-10 flex-col gap-4 bg-inherit text-center">
        <div className="flex items-center justify-center">
          <Image
            src={taskIllustration}
            alt="task-illustration"
            className="mx-auto h-32 w-32"
          />
        </div>

        <div>
          <h1 className="mb-1 text-xl font-medium text-gray-700">
            Focus on your day
          </h1>

          <p className="text-sm text-gray-500">
            Get things done with My Day, a list
            <br />
            that refreshes every day.
          </p>
        </div>
      </div>
    </div>
  );
}
