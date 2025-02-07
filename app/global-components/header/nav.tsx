"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
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
  const [whishCount, setWhishCount] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [gap, setGap] = useState("gap-10"); // Default gap value

  const router = useRouter();
  const { data: session } = useSession();
  const user = process.env.NEXT_PUBLIC_USER_ROLE;
  const [mounted, setMounted] = useState(false);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
    setGap(showSearchBar ? "gap-10" : "gap-4"); // Change gap based on showSearchBar
  };

  const calculateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  const calculateWhishCount = () => {
    const whish = JSON.parse(localStorage.getItem("whish")) || [];
    const totalCount = whish.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    calculateCartCount();
    calculateWhishCount();
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/sign-in");
    if (typeof window !== "undefined") {
      localStorage.removeItem("chechoutRoute");
    }
  };

  const catchRouteHandler = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chechoutRoute", "checkout");
    }
  };

  return (
    <div className="bg-white shadow-sm max-w-screen-xl mx-auto text-black">
      <div className={`py-4 px-4 md:px-6 flex items-center justify-center ${gap}`}>
        <div className="lg:hidden">
          <button className="text-2xl" onClick={() => setIsNavOpen(!isNavOpen)}>
            <FiMenu />
          </button>
        </div>

        <div className="font-extrabold text-2xl">
          <Link href="/home">SHOP.CO</Link>
        </div>

        <div className={`hidden lg:flex gap-8 ${showSearchBar ? 'hidden' : ''}`}>
          <Link href="/category">Category</Link>
          <Link href="/category">ProductDetail</Link>
          <Link href={"/"}>Shop</Link>
          <Link href={"/sales"}>On Sale</Link>
          <Link href="/arrivals">New Arrivals</Link>
          <Link href="/brands">Brands</Link>
        </div>

        <div className="flex items-center gap-2 lg:gap-6 ">
          <button onClick={handleSearchClick}>
            <CiSearch className="text-xl  font-bold" />
          </button>

          {showSearchBar && <SearchBar /> } {/* Show SearchBar only when showSearchBar is true */}

          {!showSearchBar && (
            <>
              <div>
                <Link href={"/whishlist"} className="relative" onClick={catchRouteHandler}>
                  <FaRegHeart className="text-xl" />
                  {whishCount > 0 && (
                    <span className="bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                      {whishCount}
                    </span>
                  )}
                </Link>
              </div>

              <Link href="/cart" className="relative" onClick={catchRouteHandler}>
                <BsCart2 className="text-xl" />
                {cartCount > 0 && (
                  <span className="bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

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
                    <Link href={"/dashboard"}>{session.user?.name?.charAt(0)}</Link>
                  )}
                </div>
              ) : (
                <Link href="/auth/sign-in" className="hover:text-gray-800 font-semibold hover:underline">
                  <TbUserExclamation className="text-[16px] md:text-[18px] lg:text-[20px]" />
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {isNavOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-4">
          <button className="self-end text-2xl mb-4" onClick={() => setIsNavOpen(false)}>
            &times;
          </button>
          <Link href="/category" className="py-2 text-lg" onClick={() => setIsNavOpen(false)}>
            Category
          </Link>
          <Link href="/arrivals" className="py-2 text-lg" onClick={() => setIsNavOpen(false)}>
            New Arrivals
          </Link>
          <Link href="/brands" className="py-2 text-lg" onClick={() => setIsNavOpen(false)}>
            Brands
          </Link>
          <Link href="/category" className="py-2 text-lg" onClick={() => setIsNavOpen(false)}>
            ProductDetail
          </Link>
          <Link href={"/"} className="py-2 text-lg" onClick={() => setIsNavOpen(false)}>
            Shop
          </Link>
          <Link href={"/sales"} className="py-2 text-lg" onClick={() => setIsNavOpen(false)}>
            On Sale
          </Link>
        </div>
      )}
    </div>
  );
}
