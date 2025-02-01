"use client";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const isCheckout: any =
    typeof window !== "undefined"
      ? localStorage.getItem("chechoutRoute")
      : null;
  const router = useRouter();
  const { data: session } = useSession();
  const user = process.env.NEXT_PUBLIC_USER_ROLE;

  if (session && isCheckout) {
    router.push("/checkout");
  }
  if (session && !isCheckout) {
    if (session.user.email === user) {
      router.push("/adminPanel");
    } else {
      router.push("/dashboard");
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid Credentials");
        console.log("login error");
      } else {
        console.log(result, "result");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gray-100 mb-6">
      <div className="shadow-xl p-8 rounded-lg bg-white max-w-[700px] w-full">
        <h1 className="text-xl md:text-3xl lg:text-3xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
          <FaUser className="mr-2 text-xl md:text-3xl lg:text-3xl" />
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Input with Person Icon */}
          <div className="relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Password Input with Lock Icon and Eye Icon */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <FaEyeSlash
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${showPassword ? "hidden" : ""}`}
              onClick={togglePassword}
            />
            <FaEye
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${showPassword ? "" : "hidden"}`}
              onClick={togglePassword}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white font-bold cursor-pointer px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Sign In
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-2 px-4 rounded-md mt-4">
              {error}
            </div>
          )}

          {/* Google Sign-in Button */}
          <div
            className="text-center items-center justify-center flex flex-col cursor-pointer gap-3 mt-4"
            onClick={() => signIn("google")}
          >
            <h2 className="text-center text-gray-700">Sign In with Google</h2>
            <FaGoogle className="text-[#4285F4] text-xl hover:text-red-700" />
          </div>
        </form>

        {/* Sign-Up Link */}
        <div className="text-center mt-6">
          <Link
            href="/auth/sign-up"
            className="text-sm text-gray-600 hover:underline"
          >
            Don&apos;t have an account?{" "}
            <span className="underline text-blue-700">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}