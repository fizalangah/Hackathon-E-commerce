"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { client } from "../../sanity/lib/client";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "products"]{
            _id,
            name
          }
        `);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(products);
      
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  return (
    <div className="relative">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 py-1 border w-[300px] border-gray-200 rounded-xl focus:outline-none bg-[#F0F0F0]"
      />
      <span className="absolute inset-y-0 left-2 flex items-center text-gray-400">
        <CiSearch className="text-xl" />
      </span>

      {/* Search Results Dropdown */}
      {filteredProducts.length > 0 && (
        <div className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto w-full">
          {filteredProducts.map((product) => (
            <Link  href={`/category/${product._id}`} >
              <div className="p-2 hover:bg-gray-100 cursor-pointer">
                {product.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
