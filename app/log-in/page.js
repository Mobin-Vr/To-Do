import illsturation from "@/public/icons/completed-tasks.svg";
import { ClerkLoaded, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {
  const { userId } = await auth();
  const { redirect_url } = await searchParams;

  if (userId) redirect(redirect_url || "/tasks");

  const targetUrl = redirect_url || "/tasks";

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
              priority
            />
          </div>

          <div className="flex w-full cursor-pointer justify-center">
            <SignInButton mode="modal" forceRedirectUrl={targetUrl}>
              <span className="w-1/2 select-none rounded-lg bg-blue-600 px-4 py-2 text-center font-normal text-white transition hover:bg-blue-700">
                Sign In
              </span>
            </SignInButton>
          </div>
        </div>
      </div>
    </ClerkLoaded>
  );
}
