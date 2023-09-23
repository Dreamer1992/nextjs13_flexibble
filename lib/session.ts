import { getServerSession } from 'next-auth/next'
import { NextAuthOptions, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { ISession, IUserProfile } from '@/common.types'
import { createUser, getUser } from './actions'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: 'grafbase',
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      )

      return encodedToken
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret)
      return decodedToken as JWT
    },
  },
  theme: {
    colorScheme: 'light',
    logo: 'logo.png',
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email

      try {
        if (!email) return session

        const data = (await getUser(email)) as { user?: IUserProfile }

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        }

        return newSession
      } catch (error) {
        console.log('Error retrieving user data', error)
        return session
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        if (!user?.name || !user?.email || !user?.image) return false
        const userExist = (await getUser(user.email)) as IUserProfile

        if (!userExist) {
          await createUser({
            name: user.name || '',
            email: user.email,
            image: user.image,
          })
        }

        return true
      } catch (error: any) {
        console.log('Error', error)
        return false
      }
    },
  },
}

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as ISession
  return session
}
