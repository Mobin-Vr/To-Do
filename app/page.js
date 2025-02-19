import illsturation from "@/public/completed-tasks.svg";
import { ClerkLoaded, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();

  if (userId) redirect("/tasks"); // Redirect to /tasks if signed in. Automatically returns and prevents rendering of this component

  return (
    <ClerkLoaded>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 text-center">
        <div className="flex max-w-xl flex-col items-center justify-center gap-4 p-10">
          <h1 className="text-4xl font-thin text-gray-700">
            Welcome to Microsoft To Do
          </h1>

          <div className="flex items-center justify-center">
            <Image
              src={illsturation}
              alt="completed-task"
              className="mx-auto h-52 w-52 sm:h-64 sm:w-64"
            />
          </div>

          <div className="flex w-full cursor-pointer justify-center">
            <SignInButton mode="modal" forceRedirectUrl="/tasks">
              <span className="w-1/2 rounded-lg bg-blue-600 px-4 py-2 text-center font-normal text-white transition hover:bg-blue-700">
                Sign In
              </span>
            </SignInButton>
          </div>
        </div>
      </div>
    </ClerkLoaded>
  );
}
