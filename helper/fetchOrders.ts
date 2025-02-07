// import { createClient } from '@sanity/client';
// import dotenv from 'dotenv';

// dotenv.config();

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: '2025-01-17',
//   useCdn: true,
//   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
// });

// // Function to fetch the order history from Sanity
// async function getOrderHistory(userEmail: string) {
//   const query = `
//     *[_type == "orders" && userEmail == $userEmail] {
//       _id,
//       productImage{
//           asset->{
//             _id,
//             url
//           }
//         },
//       productPrice,
//       productTitle,
//       productId,
//       dicountPercentage,
//       userEmail,
//       userName,
//       userAddress,
//       userPhoneNumber,
//       _createdAt
//     }
//   `;
  
//   const params = { userEmail };
  
//   try {
//     const orderHistory = await client.fetch(query, params);
//     return orderHistory;
//   } catch (error) {
//     console.error('Error fetching order history:', error);
//     return [];
//   }
// }

// export { getOrderHistory };