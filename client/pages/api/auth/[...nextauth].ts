import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "6cf7a148e6cdef7f3564",
      clientSecret:
        process.env.GITHUB_SECRET || "5d71b2d7fdeb73c3c0395c0bed110344d8ef8647",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "454830186669253",
      clientSecret:
        process.env.FACEBOOK_SECRET || "1b7d8f6071b10ed8a9248714cbe93bbe",
    }),
  ],
});
