import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher([
  "/tasks",
  "/tasks/:slug",
  "/settings",
]);

export default clerkMiddleware(async (auth, req) => {
  // If the URL includes "/tasks/invite", bypass authentication
  if (req.url?.includes("/tasks/invite")) {
    return;
  }

  // Protect the routes defined in the `isProtectedRoute` matcher
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
