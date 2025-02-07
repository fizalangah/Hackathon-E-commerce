// import { shipEngine } from "../../../helper/shipEngine";
// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   const { shipToAddress, packages } = await req.json();
//   try {
         

//       // Validate required fields
//       if (!shipToAddress || !packages) {
//         return new Response(
//           JSON.stringify({
//             error: "Missing required fields: shipeToAddress and packages",
//           }),
//           { status: 400 }
//         );
//       }



//       const params = {
//         shipment: {
//           shipTo: shipToAddress,
//           shipFrom: {
//             name: "John Doe",
//             phone: "+1 555 123 4567",
//             addressLine1: "742 Evergreen Terrace",
//             addressLine2: "Apt 101",
//             cityLocality: "Springfield",
//             stateProvince: "IL",
//             postalCode: "74000",
//             countryCode: "US",
//             addressResidentialIndicator: "no"as const    // TypeScript will now treat it as a literal
            
  
//           },
//           packages: packages,
//         },
//         rateOptions: {
//           carrierIds: [
//             process.env.SHIPENGINE_FIRST_COURIE || "",
//             process.env.SHIPENGINE_SECOND_COURIER || "",
//             process.env.SHIPENGINE_THIRD_COURIER || "",
//             process.env.SHIPENGINE_FOURTH_COURIER || "",
//           ].filter(Boolean),
//         },
//       }
//     const shipmentDetails = await shipEngine.getRatesWithShipmentDetails(params);


     
//     // Log details for debugging
//     console.log("Ship To Address:", shipToAddress);
//     console.log("Packages:", packages);
//     console.log("Shipment Details:", shipmentDetails);


//     return new Response(JSON.stringify(shipmentDetails), { status: 200 });
//   } catch (error : any) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// } 