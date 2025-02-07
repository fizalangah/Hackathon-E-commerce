// "use client";

// import { useState, useEffect, Suspense } from "react";
// import axios from "axios";
// import { useSearchParams, useRouter } from "next/navigation";
// // import { log } from "console";
// // import { TrackingData } from "../../../type";

// export function TrackShipment() {
//   const [labelId, setLabelId] = useState(""); // State for labelId input
//   const [trackingData, setTrackingData] = useState<any | null>(null); // State for tracking data
//   const [loading, setLoading] = useState(false); // State for loading spinner
//   const [error, setError] = useState<string | null>(null); // State for error messages

//   // Get query parameters and router
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const queryLabelId = searchParams?.get("labelId") || ""; // Safely fetch labelId
// console.log(queryLabelId,"queryLabelId");

//   // Function to handle form submission
//   const handleSubmit = async (labelId: string) => {
//     if (!labelId) {
//       setError("Label ID is required.");
//       return;
//     }

//     setLoading(true); // Show loading spinner
//     setError(null); // Clear previous errors

//     try {
//       // Update the URL with the labelId query parameter without scrolling
//       router.replace(`/checkout?labelId=${labelId}`); // No scroll option

//       // Make API request to track shipment
//       const response = await axios.get(`/api/tracking/${labelId}`);
//       setTrackingData(response.data); // Set tracking data
//     } catch (err) {
//       console.error("Error tracking shipment:", err);
//       setError("Failed to track shipment. Please check the label ID and try again."); // Set error message
//     } finally {
//       setLoading(false); // Hide loading spinner
//     }
//   };

//   // Automatically fetch tracking data if labelId is present in query params
//   useEffect(() => {
//     if (queryLabelId) {
//       setLabelId(queryLabelId); // Set labelId from query params
//       handleSubmit(queryLabelId); // Automatically submit the form
//     }
//   }, [queryLabelId]);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 text-black">
//       <div className="max-w-4xl mx-auto px-4">
//         <h1 className="md:text-3xl sm:text-2xl text-[22px] font-bold text-center mb-8">Track Your Shipment</h1>

//         {/* Input Form */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSubmit(labelId);
//           }}
//           className="bg-white p-6 rounded-lg shadow-md"
//         >
//           <div className="flex flex-col space-y-4">
//             <label htmlFor="labelId" className="sm:text-lg text-[17px] font-medium">
//               Enter Label ID or Tracking Number:
//             </label>
//             <input
//               type="text"
//               id="labelId"
//               value={labelId}
//               onChange={(e) => setLabelId(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter label ID"
//               required
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300"
//             >
//               {loading ? "Tracking..." : "Track Shipment"}
//             </button>
//           </div>
//         </form>

//         {/* Error Message */}
//         {error && (
//           <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Tracking Details */}
//         {trackingData && (
//           <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Tracking Details</h2>
//             <div className="space-y-4">
//               <p>
//                 <span className="font-semibold">Tracking Number:</span>{" "}
//                 {trackingData.trackingNumber}
//               </p>
//               <p>
//                 <span className="font-semibold">Status:</span>{" "}
//                 {trackingData.statusDescription}
//               </p>
//               <p>
//                 <span className="font-semibold">Carrier Status:</span>{" "}
//                 {trackingData.carrierStatusDescription || "N/A"}
//               </p>
//               <p>
//                 <span className="font-semibold">Estimated Delivery:</span>{" "}
//                 {trackingData.estimatedDeliveryDate || "N/A"}
//               </p>
//               <p>
//                 <span className="font-semibold">Actual Delivery:</span>{" "}
//                 {trackingData.actualDeliveryDate || "N/A"}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function TrackingPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <TrackShipment />
//     </Suspense>
//   );
// }
