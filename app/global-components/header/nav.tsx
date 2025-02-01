"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import SearchBar from "../searchbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TbUserExclamation } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import {
  FaHome,
  FaShoppingBag,
  FaBlog,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  const user = process.env.NEXT_PUBLIC_USER_ROLE;
  const [mounted, setMounted] = useState(false);
   

  //new
  if (typeof window !== "undefined") {
    if (document.cookie.includes("next-auth.session-token")) {
      console.log("Token is present in document.cookie");
    } else {
      console.log("Token is not found in document.cookie");
    }
    }


    //new
    const handleLogout = async () => {
   
      await signOut({ redirect: false });
      // toggleMenu()
      router.push("/auth/sign-in");
  
      if (typeof window !== "undefined") {
        localStorage.removeItem("chechoutRoute");
      }
      //  toggleMenu()
    };


    //new 
    const catchRouteHandler = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("chechoutRoute", "checkout");
      }
    };

    //nw 
    // useEffect(() => {
    //   setMounted(true);
    // }, []);
  
  
    // if (!mounted) {
    //   return null; 
    // }

  // Helper function to calculate total cart count (sum of all quantities)
  const calculateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  // Initialize cart count on component mount
  useEffect(() => {
    calculateCartCount();
  }, []);

  // Example of adding a product to the cart
  const handleCart = (productId: number) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item: any) => item.id === productId);

    if (productIndex === -1) {
      // If the product is not in the cart, add it with quantity 1
      cart.push({ id: productId, quantity: 1 });
    } else {
      // If the product is already in the cart, increase its quantity
      cart[productIndex].quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    calculateCartCount(); // Update the cart count after adding/increasing an item
  };

  return (
    <div className="bg-white shadow-sm max-w-screen-xl mx-auto">
      {/* Navbar Container */}
      <div className="py-4 px-4 md:px-6 flex items-center justify-center gap-10">
        {/* Hamburger Menu for Small Screens */}
        <div className="lg:hidden">
          <button
            className="text-2xl"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Logo */}
        <div className="font-extrabold text-2xl">
          <Link href="/home">SHOP.CO</Link>
        </div>

        {/* Navbar Links (Hidden on Small Screens) */}
        <div className="hidden lg:flex gap-8">
          <Link href="/category">Category</Link>
          <Link href="/category">ProductDetail</Link>
          <Link href={"/"}>Shop</Link>
          <Link href={"/"}>On Sale</Link>
          <Link href="/home">New Arrivals</Link>
          <Link href="/home">Brands</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Render SearchBar */}
          <div className="hidden md:block">
            <SearchBar />
          </div>
          {/* Cart and User Icons */}
          <CiSearch className="text-xl lg:hidden font-bold" />
          <Link href="/cart"  className="relative" onClick={catchRouteHandler}>
            <BsCart2 className="text-xl" />
            {cartCount > 0 && (
              <span className="bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        
     {/* new  */}
     {session ? (
            <div className="text-black font-bold text-[16px] md:text-[16px] lg:text-[20px] flex justify-center flex-row gap-2 md:gap-0 mb-2">
              {session.user.email === user ? (
                <>
                  <Link href={"/adminPanel"}>Admin</Link>
                  <button className="font-normal px-3" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link href={"/dashboard"}>{session.user?.name}</Link>
              )}
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="hover:text-gray-800 font-semibold hover:underline"
            >
              <TbUserExclamation className="text-[16px] md:text-[18px] lg:text-[20px]" />
            </Link>
          )}


          {/* <FaRegCircleUser className="text-xl" /> */}
         
        </div>
      </div>

      {/* Side Navigation Menu */}
      {isNavOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-4">
          <button
            className="self-end text-2xl mb-4"
            onClick={() => setIsNavOpen(false)}
          >
            &times;
          </button>
          <Link
            href="/category"
            className="py-2 text-lg"
            onClick={() => setIsNavOpen(false)}
          >
            Category
          </Link>
          <Link
            href="/home"
            className="py-2 text-lg"
            onClick={() => setIsNavOpen(false)}
          >
            New Arrivals
          </Link>
          <Link
            href="/home"
            className="py-2 text-lg"
            onClick={() => setIsNavOpen(false)}
          >
            Brands
          </Link>
          <Link
            href="/category"
            className="py-2 text-lg"
            onClick={() => setIsNavOpen(false)}
          >
            ProductDetail
          </Link>
          <Link
            href={"/"}
            className="py-2 text-lg"
            onClick={() => setIsNavOpen(false)}
          >
            Shop
          </Link>
          <Link
            href={"/"}
            className="py-2 text-lg"
            onClick={() => setIsNavOpen(false)}
          >
            On Sale
          </Link>
        </div>
      )}
    </div>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { BsCart2 } from "react-icons/bs";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { CiSearch } from "react-icons/ci";
// import { FiMenu } from "react-icons/fi";
// import SearchBar from "../searchbar";
// import { useSession, signIn, signOut } from "next-auth/react";

// export default function Navbar() {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const { data: session } = useSession();

//   // Helper function to calculate total cart count (sum of all quantities)
//   const calculateCartCount = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//     setCartCount(totalCount);
//   };

//   // Initialize cart count on component mount
//   useEffect(() => {
//     calculateCartCount();
//   }, []);

//   // Example of adding a product to the cart
//   const handleCart = (productId: number) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const productIndex = cart.findIndex((item: any) => item.id === productId);

//     if (productIndex === -1) {
//       // If the product is not in the cart, add it with quantity 1
//       cart.push({ id: productId, quantity: 1 });
//     } else {
//       // If the product is already in the cart, increase its quantity
//       cart[productIndex].quantity += 1;
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     calculateCartCount(); // Update the cart count after adding/increasing an item
//   };

//   return (
//     <div className="bg-white shadow-sm max-w-screen-xl mx-auto">
//       {/* Navbar Container */}
//       <div className="py-4 px-4 md:px-6 flex items-center justify-center gap-10">
//         {/* Hamburger Menu for Small Screens */}
//         <div className="lg:hidden">
//           <button
//             className="text-2xl"
//             onClick={() => setIsNavOpen(!isNavOpen)}
//           >
//             <FiMenu />
//           </button>
//         </div>

//         {/* Logo */}
//         <div className="font-extrabold text-2xl">
//           <Link href="/home">SHOP.CO</Link>
//         </div>

//         {/* Navbar Links (Hidden on Small Screens) */}
//         <div className="hidden lg:flex gap-8">
//           <Link href="/category">Category</Link>
//           <Link href="/category">ProductDetail</Link>
//           <Link href={"/"}>Shop</Link>
//           <Link href={"/"}>On Sale</Link>
//           <Link href="/home">New Arrivals</Link>
//           <Link href="/home">Brands</Link>
//         </div>

//         {/* Icons */}
//         <div className="flex items-center gap-6">
//           {/* Render SearchBar */}
//           <div className="hidden md:block">
//             <SearchBar />
//           </div>
//           {/* Cart and User Icons */}
//           <CiSearch className="text-xl lg:hidden font-bold" />
//           <Link href="/cart">
//             <BsCart2 className="text-xl" />
//             {cartCount > 0 && (
//               <span className="bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//           {session ? (
//             <button onClick={() => signOut()} className="flex items-center gap-2">
//               <FaRegCircleUser className="text-xl" />
//               <span>Logout</span>
//             </button>
//           ) : (
//             <button onClick={() => signIn()} className="flex items-center gap-2">
//               <FaRegCircleUser className="text-xl" />
//               <span>Login</span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Side Navigation Menu */}
//       {isNavOpen && (
//         <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-4">
//           <button
//             className="self-end text-2xl mb-4"
//             onClick={() => setIsNavOpen(false)}
//           >
//             &times;
//           </button>
//           <Link
//             href="/category"
//             className="py-2 text-lg"
//             onClick={() => setIsNavOpen(false)}
//           >
//             Category
//           </Link>
//           <Link
//             href="/home"
//             className="py-2 text-lg"
//             onClick={() => setIsNavOpen(false)}
//           >
//             New Arrivals
//           </Link>
//           <Link
//             href="/home"
//             className="py-2 text-lg"
//             onClick={() => setIsNavOpen(false)}
//           >
//             Brands
//           </Link>
//           <Link
//             href="/category"
//             className="py-2 text-lg"
//             onClick={() => setIsNavOpen(false)}
//           >
//             ProductDetail
//           </Link>
//           <Link
//             href={"/"}
//             className="py-2 text-lg"
//             onClick={() => setIsNavOpen(false)}
//           >
//             Shop
//           </Link>
//           <Link
//             href={"/"}
//             className="py-2 text-lg"
//             onClick={() => setIsNavOpen(false)}
//           >
//             On Sale
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }