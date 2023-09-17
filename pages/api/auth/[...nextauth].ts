import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
// import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
        
    //     if (credentials?.email === 'user@mail.com' && credentials.password === '123') {
    //       return Promise.resolve({id: 1, name: 'User'})
    //     } else {
    //       return Promise.resolve(null)
    //     }
    //   },
    // }),
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
  session: {
    strategy: "jwt"
  }
});
