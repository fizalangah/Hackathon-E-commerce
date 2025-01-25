import React from 'react'
import { useState,useEffect } from 'react';
import {client} from '../../../sanity/lib/client';
import Link from 'next/link';
import Card from '../../global-components/cardcomp';
export default function SellingSection() {
    const [data, setData] = useState([]);
        
          useEffect(() => {
            const fetchProducts = async () => {
              try {
                const data = await client.fetch(`
                  *[_type == "products"]{
                    _id,
                    name,
                    price,
                    description,
                    "imageUrl": image.asset->url,
                    category,
                    discountPercent,
                    new,
                    colors,
                    sizes
                  }
                `);
                setData(data.slice(8, 12));
              } catch (error) {
                console.error("Error fetching products:", error);
              }
            };
        
            fetchProducts();
          }, []);
  return (
    <div>
        <h2 className='text-center  pt-10 text-3xl font-extrabold bg-white  '>TOP SELLING</h2>
        <div className="min-h-screen bg-white flex items-center justify-center lg:-mt-20 flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((card, id) => (
          <Card
            key={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            rating={card.rating}
            price={card.price}
          />
        ))}
      </div>
  
      <button className='px-10 py-1 rounded-2xl  bg-white  border hover:bg-[#F0F0F0]  mb-2  text-sm'> <Link href='/category'>View ALL</Link></button>
     
    </div>

    </div>
  )
}
