
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import products from '../sanity/schemaTypes/products';
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2025-01-25',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN
});
  

interface OrderData {
  productImage: any; 
  productId:any
  productPrice: number;
  productTitle: string;
  dicountPercentage: number;
  userId: string;
  userEmail: string;
  userName: string;
  userAddress: string;
  userPhoneNumber: string;
}


async function postOrderData(orderData: OrderData) {
  try {
    const response = await client.create({
      _type: 'orders',
      productImage: orderData.productImage,
      productPrice: orderData.productPrice,
      productId:orderData.productId,
      productTitle: orderData.productTitle,
      dicountPercentage: orderData.dicountPercentage,
      userId: orderData.userId,
      userEmail: orderData.userEmail,
      userName: orderData.userName,
      userAddress: orderData.userAddress,
      userPhoneNumber: orderData.userPhoneNumber,
    });
  
    console.log('Order created successfully:', response);
  } catch (error) {
    console.error('Error posting order data:', error);
  }
}

export { postOrderData };