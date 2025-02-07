
"use client"

import { FaBars, FaTimes } from "react-icons/fa"; 
import { useState } from "react";
import { MdArrowForwardIos, MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUser, FaBox, FaShieldAlt, FaHeart, FaCreditCard, FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { MdArrowForwardIos } from "react-icons/md";

  

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <div className="grid place-items-center h-screen">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/sign-in");
    if (typeof window !== "undefined") {
      localStorage.removeItem("chechoutRoute");
    }
  };
  return (
    <div className={`flex ${isOpen ? 'h-full' : ''}`}>
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 lg:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
      />
      
      {/* Sidebar */}
      <div
        className={`lg:flex lg:flex-col fixed top-0 left-0 w-64 h-full   transform ${isOpen ? 'translate-x-0 bg-black' : '-translate-x-full'} transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
        {/* Logo and Close Button */}
        <div className="p-4 flex justify-between items-cente">
          <span className="text-xl font-bold">Dashboard</span>
          <button className="lg:hidden" onClick={toggleSidebar} title="button">
            <FaTimes className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-4">
           <Link
            href="/dashboard/profile"
            className="flex items-center  text-white hover:bg-black px-4 py-2 rounded-md "
          >
            <FaUser className="mr-4 text-xl" />
            <span className="">Profile</span>
          </Link>
          <Link
            href="/dashboard/orders"
            className="flex items-center  text-white hover:bg-black px-4 py-2 rounded-md "
          >
            <FaBox className="mr-4 text-xl" />
            <span className="">Order History</span>
          </Link>
          <Link
            href="/dashboard/security"
            className="flex items-center text-white hover:bg-black px-4 py-2 rounded-md "
          >
            <FaShieldAlt className="mr-4 text-xl" />
            <span className="">Security</span>
          </Link>
          <Link
            href="/dashboard/whishlist"
            className="flex items-center  text-white hover:bg-black px-4 py-2 rounded-md "
          >
            <FaHeart className="mr-4 text-xl" />
            <span className="">Wishlist</span>
          </Link>
          <Link
            href="/dashboard/payment"
            className="flex items-center  text-white hover:bg-black px-4 py-2 rounded-md "
          >
            <FaCreditCard className="mr-4 text-xl" />
            <span className="">Payment Methods</span>
          </Link>
          {/* <Link
            href="/dashboard/addresses"
            className="flex items-center  text-white hover:bg-black px-4 py-2 rounded-md "
          >
            <FaMapMarkedAlt className="mr-4 text-xl" />
            <span className="">Addresses</span>
          </Link> */}

          <button
            onClick={handleLogout}
            className="flex items-center  text-white hover:bg-black px-4 py-2 rounded-md "
          >
            <FaSignOutAlt className="mr-4 text-xl" />
            <span className="">Log Out</span>
          </button>
        </nav>
      </div>

      {/* Hamburger Menu (on mobile) */}
      <button
      title="button"
        className="lg:hidden  mt-4 text-black"
        onClick={toggleSidebar}
      >
        <MdOutlineDashboardCustomize className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Sidebar;