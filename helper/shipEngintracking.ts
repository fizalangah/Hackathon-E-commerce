// // src/helper/shipEngine.ts

// import axios from "axios";

// export const shipEngine = {
//   trackShipment: async (trackingNumber: string) => {
//     try {
//       const response = await axios.get(`https://api.shipengine.com/v1/tracking`, {
//         headers: {
//           Authorization: `Bearer ${process.env.SHIPENGINE_API_KEY}`, // Ensure API key is set in .env file
//         },
//         params: {
//           tracking_number: trackingNumber,
//         },
//       });

//       return response.data; // This should return the tracking data
//     } catch (error) {
//       console.error("ShipEngine API error:", error);
//       throw new Error("Failed to track shipment");
//     }
//   },
// };