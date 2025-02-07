"use client";
import { useState } from "react";

export default function Filter() {

    const products = [
        { id: 1, name: "T-Shirt", price: "$100", image: "/product1.jpg", color: "Red", size: "M", style: "Casual", rating: "⭐" },
        { id: 2, name: "Shorts", price: "$120", image: "/product2.jpg", color: "Blue", size: "L", style: "Formal", rating: "⭐" },
        { id: 3, name: "Jeans", price: "$80", image: "/product3.jpg", color: "Green", size: "S", style: "Party", rating: "⭐" },
        { id: 4, name: "Hoodie", price: "$150", image: "/product4.jpg", color: "Black", size: "XL", style: "Sports", rating: "⭐" },
        { id: 1, name: "T-Shirt", price: "$100", image: "/product1.jpg", color: "Red", size: "M", style: "Casual", rating: "⭐" },
        { id: 2, name: "Shorts", price: "$120", image: "/product2.jpg", color: "Blue", size: "L", style: "Formal", rating: "⭐" },
        { id: 3, name: "Jeans", price: "$80", image: "/product3.jpg", color: "Green", size: "S", style: "Party", rating: "⭐" },
        { id: 4, name: "Hoodie", price: "$150", image: "/product4.jpg", color: "Black", size: "XL", style: "Sports", rating: "⭐" },
      ];
    
      const colors = ["Red", "Blue", "Green", "Black", "Yellow", "Pink", "Orange", "Purple", "Brown", "Gray","Green", "Black", "Yellow"];
      const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
      const dressStyles = ["Casual", "Formal", "Party", "Sports", "Beachwear","Party", "Sports", "Beachwear"];
    
      const [price, setPrice] = useState(100);
      const [selectedColor, setSelectedColor] = useState("");
      const [selectedSize, setSelectedSize] = useState("");
      const [selectedStyle, setSelectedStyle] = useState("");
    
      const filteredProducts = products.filter((product) => {
        return (
          (selectedColor ? product.color === selectedColor : true) &&
          (selectedSize ? product.size === selectedSize : true) &&
          (selectedStyle ? product.style === selectedStyle : true) &&
          parseInt(product.price.replace("$", "")) <= price
        );
      });
  return (
    <div>
<div className=" h-full bg-gray-200 p-5 flex flex-col space-y-5 border rounded">

<h2 className="text-xl font-bold text-black">Filter</h2>

{/* Product Names */}
<div className="border-b">
  <h3 className="font-bold mb-2 text-black">Products</h3>
  <ul className="space-y-4">
    {products.map((product) => (
      <li key={product.id} className="text-gray-700">
        {product.name}
      </li>
    ))}
  </ul>
</div>

{/* Price Slider */}
<div className="border-b">
  <h3 className="font-bold mb-2 text-black">Price</h3>
  <input
    type="range"
    min="50"
    max="500"
    value={price}
    onChange={(e) => setPrice(parseInt(e.target.value))}
    className="w-full"
  />
  <p className="text-gray-600 mt-2">Up to: ${price}</p>
</div>

{/* Colors */}
<div className="border-b">
  <h3 className="font-bold mb-2 text-black">Colors</h3>
  <div className="grid grid-cols-4 gap-2">
    {colors.map((color, index) => (
      <button
        key={index}
        onClick={() => setSelectedColor(color)}
        className={`w-8 h-8 rounded-full border-2 ${
          selectedColor === color ? "border-black" : "border-white"
        }`}
        style={{ backgroundColor: color.toLowerCase() }}
      ></button>
    ))}
  </div>
</div>

{/* Sizes */}
<div className="border-b">
  <h3 className="font-bold mb-2 text-black">Sizes</h3>
  <div className="flex flex-wrap gap-3 text-black">
    {sizes.map((size, index) => (
      <button
        key={index}
        onClick={() => setSelectedSize(size)}
        className={`border px-3 py-1 rounded ${
          selectedSize === size ? "bg-white" : ""
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</div>

{/* Dress Style */}
<div className="border-b">
  <h3 className="font-bold mb-2 text-black">Dress Style</h3>
  <div className="flex flex-col space-y-2 text-black">
    {dressStyles.map((style, index) => (
      <button
        key={index}
        onClick={() => setSelectedStyle(style)}
        className={`border px-3 py-1 rounded text-left ${
          selectedStyle === style ? "bg-gray-300" : ""
        }`}
      >
        {style}
      </button>
    ))}
  </div>
</div>

{/* Apply Filter Button */}
<button
  onClick={() => console.log("Filter applied")}
  className="bg-black text-white py-3 shadow hover:bg-gray-800 transition rounded-2xl "
>
  Apply Filter
</button>
</div>
    </div>
  )
}
