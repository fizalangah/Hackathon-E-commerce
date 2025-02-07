// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";

// const Placeholder: React.FC = () => {
//   const router = useRouter();
//   const placeOrder = () => {
//     alert("Your Order has been placed!");
//     router.push("/");

   
//   };
//   return (
//     <div className=" py-12 px-6 ">
//       {/* Product Card */}
//       <div className=" p-6  mb-6 mt-8">
//         {/* Product Information */}
//         <div className="mb-4">
//           <div className="flex justify-between mb-2">
//             <div className="flex flex-col">
//               <h1 className="mb-3">Product</h1>
//               <span className="text-sm text-gray-400">Sofa x 1</span>
//             </div>
//             <div className="flex flex-col">
//               <h1 className="mb-3">Subtotal</h1>
//               <span className=" text-gray-400 text-[13px] ml-2 mb-3">
//                 $120.00
//               </span>
//             </div>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span className="text-sm text-gray-700">subtotal</span>
//             <span className=" text-gray-400 text-[13px] mb-3">$120.00</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span className="text-sm text-gray-700">Total</span>
//             <span className=" text-yellow-600 font-bold mb-3 text-2xl">
//               $120.00
//             </span>
//           </div>
//           <div className="flex justify-between mb-4">
//             <span className="text-sm text-gray-700">Payment Method</span>
//             <span className="font-semibold text-gray-800">Credit Card</span>
//           </div>
//         </div>

//         {/* Privacy Policy Section */}
//         <div className="mb-4">
//           <p className="text-sm text-gray-600 text-wrap">
//             Your personal information will be handled according to our terms and
//             conditions.
//           </p>
//           <p className="text-sm text-gray-600 text-wrap">
//             By placing an order, you agree to our{" "}
//             <a href="#" className="text-blue-600 hover:underline">
//               Privacy Policy
//             </a>
//             .
//           </p>
//         </div>

//         {/* Place Order Button */}
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={placeOrder}
//             className="w-fit py-3 px-10  text-black border border-black  font-semibold rounded-xl hover:bg-yellow-600  hover:text-white hover:border-none transition-colors"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Placeholder;