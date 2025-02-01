"use client";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

//react component
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Field validation
  //   if (
  //     !name ||
  //     !email ||
  //     !password ||
  //     !confirmPassword ||
  //     !phoneNumber ||
  //     !address
  //   ) {
  //     setError("All fields are necessary.");
  //     return;
  //   }
  //   // Email validation (simple)
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (!emailRegex.test(email)) {
  //     setError("Please enter a valid email address.");
  //     return;
  //   }
  //   // Password validation
  //   if (password.length < 6) {
  //     setError("Password must be at least 6 characters.");
  //     return;
  //   }

  //   // Phone number validation (simple check for non-empty string)
  //   if (phoneNumber.length < 10) {
  //     setError("Phone number must be at least 10 digits.");
  //     return;
  //   }

  //   try {
  //     const res = await fetch("/api/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //         phoneNumber,
  //         address,
  //       }),
  //     });

  //     if (res.ok) {
  //       const form = e.currentTarget as HTMLFormElement;
  //       form.reset();
  //       router.push("/auth/sign-in");
  //     } else {
  //       setError("User registration failed.");
  //     }
  //   } catch (error) {
  //     // setError("Error during registration: " + error);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Field validation
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !address
    ) {
      setError("All fields are necessary.");
      return;
    }
  
    // Email validation (simple)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    // Phone number validation (simple check for non-empty string)
    if (phoneNumber.length < 10) {
      setError("Phone number must be at least 10 digits.");
      return;
    }
  
    try {
      const res = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          address,
        }),
      });
  
      if (res.ok) {
        console.log("User registered successfully"); // Log for debugging
  
        // Reset form state manually here
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setAddress('');
  
        // Redirect to the sign-in page
        console.log("Redirecting to sign-in...");
        router.push("/auth/sign-in");
      } else {
        const errorData = await res.json();
        console.log("Registration failed", errorData);
        setError("User registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Error during registration: " + error);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-gray-50 mb-6">
      <div className="bg-white shadow-2xl p-10 rounded-lg border-2 border-yellow-600 w-full max-w-[700px]">
        <h1 className="text-xl md:text-3xl lg:text-3xl font-extrabold text-gray-900 text-center mb-8 flex items-center justify-center">
          <FaUserCircle className="mr-2 text-xl md:text-3xl lg:text-3xl" />
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />

          {/* Email */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />

          {/* Password */}
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="text-gray-500" />
              ) : (
                <FiEye className="text-gray-500" />
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="text-gray-500" />
              ) : (
                <FiEye className="text-gray-500" />
              )}
            </div>
          </div>

          {/* Phone Number */}
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />

          {/* Address */}
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-semibold text-lg py-3 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            Create Account
          </button>

          {/* Error message */}
          {error && (
            <div className="bg-red-500 text-white text-center py-2 px-4 rounded-md mt-4">
              {error}
            </div>
          )}

          {/* Google Sign Up */}
          <div
            className="text-center cursor-pointer mt-6"
            onClick={() => signIn("google")}
          >
            <h2 className="text-gray-600 text-lg">Or sign up with Google</h2>
            <FaGoogle className="mx-auto text-[#4285F4] text-2xl mt-3 hover:text-red-700" />
          </div>
        </form>

        {/* Already have an account? Sign In */}
        <div className="text-center mt-6">
          <Link
            href="/auth/sign-in"
            className="text-sm text-gray-700 hover:underline"
          >
            Already have an account? <span className="underline">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}