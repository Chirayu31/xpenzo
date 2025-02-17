import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/', // Redirect to root for sign-in
  },
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - root (/) - should be public
     * - API routes (/api/...)
     * - Next.js static files
     * - Next.js image optimization
     * - Common metadata files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',
  ],
}
