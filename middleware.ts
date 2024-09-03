import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the public routes
const isPublicRoute = createRouteMatcher([
  "/", // Home page
  "/sign-in(.*)", // Sign-in page
  "/sign-up(.*)", // Sign-up page
  "/about(.*)", // Example: About page (add more routes as needed)
]);

export default clerkMiddleware((auth, request) => {
  // If the route is not public, require authentication
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Apply middleware to all routes while skipping Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
