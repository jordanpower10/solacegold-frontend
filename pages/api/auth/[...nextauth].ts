import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "Jordan",
          email: "info@solacegold.com",
          password: "gold123"
        }

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            type: "credentials"
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
        },
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-dev-key",
})
