import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/', // Redirect to root for sign-in
  },
})

export const config = {
  matcher: ['/transaction/:path*', '/category/:path*', '/logout'],
}
