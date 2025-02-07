"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto mt-20 p-5 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-black text-center">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-200">
        {wishlist.map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="w-[295px] h-auto rounded-[20px] p-4 flex flex-col items-center">
              <img
                src={product.imageUrl}
                alt="Product"
                className="w-[295px] h-[295px] object-cover bg-[#F0F0F0] rounded-xl"
              />
              <p className="mt-4 text-gray-700 text-center font-bold">{product.title}</p>
              <p className="mt-2 text-gray-900 font-bold">{product.price}</p>
              <Link href={`/category/${product.id}`}>Product Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;