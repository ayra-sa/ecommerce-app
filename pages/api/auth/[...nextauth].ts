import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
// import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
          acces_type: "offline",
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt"
  }
});
