"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2025-01-25',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN
});

// Function to upload image to Sanity
async function uploadImageToSanity(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop(),
    });

    console.log('Image uploaded successfully with ID:', asset._id); // Log image ID
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    paymentMethod: "creditCard", 
  });

  const [cart, setCart] = useState<any[]>([]); // Store cart items here

  useEffect(() => {
    // Assuming the cart is stored in localStorage, you can fetch it here
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    console.log('Fetched cart items:', savedCart); // Log cart items
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Simple client-side validation (optional)
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      // Map cart items and upload their images to Sanity
      const cartItemsWithImageIds = await Promise.all(
        cart.map(async (item) => {
          console.log('Processing item:', item); // Log each cart item
          const imageId = await uploadImageToSanity(item.imageUrl);
          if (imageId) {
            console.log('Item image ID:', imageId); // Log image ID for the item
          } else {
            console.warn('Failed to upload image for item:', item.name);
          }
          return {
            ...item,
            _key: uuidv4(), // Add a unique _key property
            imageId: imageId, // Attach the imageId to each cart item
          };
        })
      );
  
      console.log('Cart items with image IDs:', cartItemsWithImageIds); // Log the updated cart items
  
      // Prepare the order data to be sent to Sanity
      const orderData = {
        _type: "order", // Document type in Sanity
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        phoneNumber: formData.phoneNumber,
        paymentMethod: formData.paymentMethod,
        cartItems: cartItemsWithImageIds.map((item) => ({
          _type: "cartItem",
          _key: item._key, // Include the _key property
          name: item.name,
          price: item.price, // Include price
          quantity: item.quantity, // Include quantity
          image: item.imageId ? { _type: "image", asset: { _ref: item.imageId } } : null,
        })),
      };
  
      console.log('Order data to be created:', orderData); // Log order data before sending to Sanity
  
      // Send the order data to Sanity
      const result = await client.create(orderData); // This creates a new document in Sanity
  
      if (result) {
        alert("Order placed successfully!");
        setFormData({
          fullName: "",
          email: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          phoneNumber: "",
          paymentMethod: "creditCard",
        });
        setCart([]); // Clear the cart after submission
        localStorage.removeItem("cart"); // Clear the cart from localStorage as well
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center m-[100px]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display Cart Items */}
          <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                    <p>{item.name}</p>
                    <p>{item.quantity} x ${item.price}</p>
                  </div>
                  <div>
                    <p>Total: ${item.quantity * item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cashOnDelivery">Cash on Delivery</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
