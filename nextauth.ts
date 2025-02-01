import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "./lib/mongodb";
import { AuthOptions, User as NextAuthUser } from "next-auth";
import User from "./app/models/schema";

interface CustomUser extends NextAuthUser {
  role: string;
  image?: string;
  phoneNumber : number;
  address: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<CustomUser | null> {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const userFromDb = await User.findOne({ email }).exec();
          if (!userFromDb) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            userFromDb.password
          );

          if (!passwordsMatch) {
            return null;
          }

          // Create a user object compatible with NextAuth
          const userResponse: CustomUser = {
            id: userFromDb.id,
            email: userFromDb.email,
            name: userFromDb.name,
            role: userFromDb.role,
            image: userFromDb.image,
            phoneNumber: userFromDb.phoneNumber,
            address: userFromDb.address,
          };
          

          return userResponse;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);