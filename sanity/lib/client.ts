// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true,
//   token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
   // Set to false if statically generating pages, using ISR or tag-based revalidation
//})

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for authenticated requests
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

// Test the client
client.fetch('*[_type == "yourType"]')
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));
