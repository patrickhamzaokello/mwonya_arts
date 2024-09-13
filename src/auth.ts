import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"
import bcrypt from "bcryptjs"

// auth
export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(db) as any,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days (this is in seconds)
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true

    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // Validate the credentials given by the user
          const validatedFields = await LoginSchema.safeParse(credentials)
          let user = null
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;

            const user = await getUserByEmail(email);

            if (!user || !user.password) throw new Error("User not found.");

            // check if passwords match
            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );
            // if the passwords match, return the user
            if (passwordsMatch) return user;
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      }


    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {

    async signIn({ user, account }) {

      if (account?.provider !== "credentials") return true;

      const exisitingUser = await getUserById(user.id ?? '');

      if (!exisitingUser?.emailVerified) return false;

      return true;

    },

    async session({ session, token }) {
      console.log("Session callback", { session, token })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const exisitingUser = await getUserById(token.sub);

      if (!exisitingUser) return token;

      token.role = exisitingUser.role;
      return token;
    },
  },
});
