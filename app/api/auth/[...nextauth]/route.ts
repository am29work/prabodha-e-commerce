export const runtime = 'nodejs'; // This forces Next.js to stop using the Edge/Client runtime
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
  async session({ session, user }: any) {
    if (session.user) {
      session.user.id = user.id;
    }
    return session;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth', // Points to your custom "Join Prabodha" page
  },
});

export { handler as GET, handler as POST };