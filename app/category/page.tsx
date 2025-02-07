"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Filter from "../page-components/filter";
import { client } from "../../sanity/lib/client";
import Footer from "../global-components/footer";

const CategoryPage = () => {
  type Product = {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
    price: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  async function fetchProducts(): Promise<Product[]> {
    const query = `
      *[_type == "products"]{
        _id,
        name,
        price,
        description,
        "imageUrl": image.asset->url,
        category,
        discountPercent,
        new,
        colors,
        sizes
      }
    `;
    const products = await client.fetch(query);
    return products.map((product: any) => ({
      id: product._id,
      title: product.name,
      imageUrl: product.imageUrl || "",
      rating: product.rating || 0,
      price: product.price || "N/A",
    }));
  }

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const addToWishlist = (product: Product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto flex mt-20 lg:flex-row flex-col-reverse bg-white mb-10 gap-5">
        <div className="lg:w-1/4">
          <Filter />
        </div>

        <div className="flex-1 p-5 bg-white">
          <h1 className="text-3xl font-bold mb-8 text-black">Casual</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="w-[295px] h-auto rounded-[20px] p-4 flex flex-col items-center">
                  <img
                    src={product.imageUrl}
                    alt="Product"
                    className="w-[295px] h-[295px] object-cover bg-[#F0F0F0] rounded-xl"
                  />
                  <p className="mt-4 text-gray-700 text-center font-bold">{product.title}</p>
                  <div className="mt-2 flex space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={index < product.rating ? "text-yellow-500" : "text-gray-300"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    ❤️
                  </button>
                </div>
                <p className="mt-2 text-gray-900 font-bold">{product.price}</p>
                <Link href={`/category/${product.id}`}>Product Detail</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;