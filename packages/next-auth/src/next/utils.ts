import { serialize } from "cookie"
import { Cookie } from "../core/lib/cookie"

export function setCookie(res, cookie: Cookie) {
  // Preserve any existing cookies that have already been set in the same session
  let setCookieHeader = res.getHeader("Set-Cookie") ?? []
  // If not an array (i.e. a string with a single cookie) convert it into an array
  if (!Array.isArray(setCookieHeader)) {
    setCookieHeader = [setCookieHeader]
  }
  const { name, value, options } = cookie
  const cookieHeader = serialize(name, value, options)
  setCookieHeader.push(cookieHeader)
  res.setHeader("Set-Cookie", setCookieHeader)
}

/** Extract the host from the environment */
export function detectHost(forwardedHost: any) {
  /* If the user has explicitly set canonical URL using NEXTAUTH_URL,
   we respect that setting. */
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
  // If we detect a Vercel environment, we can trust the host
  if (process.env.VERCEL) return forwardedHost
  // Fallback to "http://localhost:3000"
  return undefined
}
