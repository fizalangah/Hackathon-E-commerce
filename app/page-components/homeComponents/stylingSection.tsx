import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '../../../sanity/lib/client';

export default function BrowseByStyle() {
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
                  setData([...data.slice(0, 3), ...data.slice(11, 12)]);
                } catch (error) {
                  console.error("Error fetching products:", error);
                }
              };
          
              fetchProducts();
            }, []);
  return (
    <div className="flex flex-col justify-center gap-10 rounded-2xl mb-10 bg-gray-200 p-[60px]">
      <h2 className="text-center pt-10 pb-10 text-3xl font-extrabold">BROWSE BY DRESS STYLE</h2>

      <div className="flex justify-center gap-10 lg:flex-row flex-col items-center  ">
        {/* Mapping first two images */}
        {data.slice(0, 2).map((image, index) => (
          <div
            key={image._id}
            className={`${
              index === 0 ? 'lg:w-1/3 w-1/2' : 'w-1/2'
            } bg-white  relative`}
             style={{ height: '350px' }} // Fixed card height
          >
            <Image
              src={image.imageUrl}
              alt={`Style ${index + 1}`}
              layout="fill" // Fill the card
              objectFit="cover" // Ensure image covers the card
            //   height={289}
            //   width={index === 0 ? 407 : 684}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-10 lg:flex-row flex-col items-center ">
        {/* Mapping next two images */}
        {data.slice(2, 4).map((image, index) => (
          <div
            key={image._id}
            className={`${
              index === 1 ? 'lg:w-1/3 w-1/2' : 'w-1/2'
            } bg-white  relative`}
            style={{ height: '350px' }} // Fixed card height
          >
            <Image
              src={image.imageUrl}
              alt={`Style ${index + 3}`}
              layout="fill" // Fill the card
              objectFit="cover" // Ensure image covers the card
            //   height={289}
            //   width={index === 1 ? 407 : 684}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
