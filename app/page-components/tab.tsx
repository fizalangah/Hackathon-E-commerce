"use client";


import React, { useEffect, useState } from "react";
import ReviewsTab from "./reviws";
import { client } from "../../sanity/lib/client";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("details");
   const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await client.fetch(`
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
          `);
          setData(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, []);
  

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 justify-around" >
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "details"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "reviews"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          All Reviews
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "faqs"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "details" && (
          <div>
            <h2 className="text-lg font-semibold">Product Details</h2>
            <p className="mt-2 text-gray-600">
            {data.map((product) => (product.description))}
            {/* Wireless Bluetooth Headphones: Experience premium sound quality with active noise cancellation and up to 40 hours of battery life.
Brand: AudioTech | Price: $129.99 | Rating: ★★★★☆ (4.5/5).
Available in multiple colors (Black, White, Blue, Red) and In Stock. */}
            </p>
          </div>
        )}
       {activeTab === "reviews" && <ReviewsTab />}
        {activeTab === "faqs" && (
          <div>
            <h2 className="text-lg font-semibold">FAQs</h2>
            <ul className="mt-2 space-y-4 text-gray-600">
              <li>
                <strong>Q: What is the warranty period?</strong>
                <p>A: The warranty period is one year.</p>
              </li>
              <li>
                <strong>Q: Does it come with free shipping?</strong>
                <p>A: Yes, free shipping is included for all orders above $50.</p>
              </li>
              <li>
                <strong>Q: Can I return the product?</strong>
                <p>
                  A: Yes, returns are accepted within 30 days of purchase.
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
