import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) return null;

        const isMatch = user.password
          ? await bcrypt.compare(password, user.password)
          : false;
        if (!isMatch) return null;

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (!existingUser) {
          return '/applyCamp';
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        const isAdmin = user.password
          ? await bcrypt.compare('teamHex2550', user.password)
          : false;
        if (isAdmin) {
          token.id = user.id;
          token.username = user.username;
          token.email = user.email;
          token.admin = true;
        } else {
          token.id = user.id;
          token.username = user.username;
          token.email = user.email;
          token.admin = false;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.username,
          email: token.email,
          admin: token.admin,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
