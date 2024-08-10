import prisma from '@/utils/prismaClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'

const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET!,
}

export default authOptions
