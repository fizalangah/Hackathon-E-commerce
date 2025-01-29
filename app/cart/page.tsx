"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Calculate total price (ensure price is a valid number)
  const totalPrice = cartItems.reduce(
    (total, item) => total + (Number(item.price) * (item.quantity || 0)),
    0
  );

  // Calculate total quantity
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  const removeItem = (productId) => {
    console.log("Removing product with id:", productId);
    console.log("Cart before removal:", cartItems);
  
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    console.log("Updated Cart after removal:", updatedCart);
  
    setCartItems(updatedCart); // Update the state with the new cart
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };
  

  // Increment quantity
  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId
        ? { ...item, quantity: item.quantity + 1 || 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrement quantity
  const decrementQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="font-medium">{item.name}</h2>
                      <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                      <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                      <p className="text-lg font-semibold mt-2">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Items</span>
                  <span className="font-medium">{totalQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <hr className="my-4" />
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  />
                  <button className="w-full bg-black text-white py-3 rounded-md mb-4 hover:bg-gray-800">
                    Apply
                  </button>
                  <Link href={"/checkout"}>
                    <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                      Go to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
