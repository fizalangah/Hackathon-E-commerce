"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { useSession } from "next-auth/react";

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-01-25",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

const OrderPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession(); // Fetch logged-in user session

  useEffect(() => {
    // Fetch orders from Sanity
    const fetchOrders = async () => {
      if (!session?.user?.email) { setLoading(false);
        return;
      }

      try {
        const userId = session.user.email; // Use logged-in user's email
        const query = `*[_type == "order" && email == $userId] | order(_createdAt desc) {
          _id,
          fullName,
          email,
          address,
          city,
          state,
          postalCode,
          phoneNumber,
          paymentMethod,
          cartItems[] {
            _key,
            name,
            price,
            quantity,
            image {
              asset-> {
                url
              }
            }
          },
          _createdAt
        }`;
        const params = { userId };
        const orders = await client.fetch(query, params);
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center text-gray-600">No orders found.</p>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-200 p-6 rounded-lg shadow-md border border-gray-100 max-w-full"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Order ID: <span className="text-gray-900 break-all">{order._id}</span>
            </h2>
            <p className="text-gray-600 mb-1">
              Date: <span className="text-gray-800">{new Date(order._createdAt).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-600 mb-1">
              Total Items: <span className="text-gray-800">{order.cartItems.length}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Total Amount: <span className="text-gray-800">${order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Items:</h3>
              <ul className="space-y-4">
                {order.cartItems.map((item) => (
                  <li key={item._key} className="flex items-start space-x-4">
                    {item.image?.asset?.url && (
                      <img
                        src={item.image.asset.url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Price: ${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
