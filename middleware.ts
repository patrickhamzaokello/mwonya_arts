export { default } from "next-auth/middleware"
export { auth as middleware } from "./src/auth"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/", "/(api|trpc)(.*)"]
}