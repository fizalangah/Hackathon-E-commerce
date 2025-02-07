"use client";
import React from 'react';
 import { useState,useEffect } from 'react';
import Image from 'next/image';
// import { client} from '../lib/client';

// import { cardArrivalData, TopsellingData } from '../component/cardData';
import Card from '../global-components/cardcomp';

import CustomerCarousel from '../page-components/homeComponents/custimercrousl';
import Link from 'next/link';
import { client } from '../../sanity/lib/client';
import ArrivalSection from '../page-components/homeComponents/arrivalSection';
import SellingSection from '../page-components/homeComponents/sellingSection';
import BrowseByStyle from '../page-components/homeComponents/stylingSection';
import { log } from 'node:console';
import Footer from '../global-components/footer';


 
export default function Homepage() {
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
        setData(data);
        console.log(data,"data");
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);



  return (
    <main className='max-w-screen-xl mx-auto'>
      
      {/* Hero Section */}
      <div className=" flex flex-col lg:flex-row items-center lg:items-start  ">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 px-5 lg:px-10 mt-10 lg:mt-[100px] space-y-5 bg-white text-black">
          <h1 className="font-extrabold text-3xl lg:text-6xl text-center lg:text-left">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-400 text-center lg:text-left">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className="bg-black text-white px-8 py-2 rounded-2xl text-sm">
              <Link href={"/category"}>Shop Now</Link> 
            </button>
          </div>
          <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-2xl lg:text-4xl font-semibold">200+</h3>
              <p className="text-gray-400 text-xs">International Brands</p>
            </div>
            <div className="flex flex-col items-center lg:items-start border-t-2 lg:border-t-0 lg:border-l-2 border-gray-300 pt-2 lg:pl-4">
              <h3 className="text-2xl lg:text-4xl font-semibold">2,000+</h3>
              <p className="text-gray-400 text-xs">High-Quality Products</p>
            </div>
            <div className="flex flex-col items-center lg:items-start border-t-2 lg:border-t-0 lg:border-l-2 border-gray-300 pt-2 lg:pl-4">
              <h3 className="text-2xl lg:text-4xl font-semibold">30,000+</h3>
              <p className="text-gray-400 text-xs">Happy Customers</p>
            </div>
          </div>
        </div>

       
        <div className="w-full lg:w-1/2  lg:mt-0 flex justify-center -z-50 ">
    <Image
      src="/herooimg.jpg"
      alt="Hero"
      width={700}
      height={400}
      className="rounded-lg"
    />
  </div>
      </div>

      {/* Brand Section */}
     {/* Brand Section Overlapping the Image */}
  <div className="absolute  lg:-mt-[280px] -mt-[100px] left-0 w-full bg-black py-5">
    <div className="flex flex-wrap justify-center lg:justify-around gap-5">
      <h4 className="text-white text-xl lg:text-3xl">ZARA</h4>
      <h4 className="text-white text-xl lg:text-3xl">VERSACE</h4>
      <h4 className="text-white text-xl lg:text-3xl">GUCCI</h4>
      <h4 className="text-white text-xl lg:text-3xl">PRADA</h4>
      <h4 className="text-white text-xl lg:text-3xl">CALVIN KLEIN</h4>
    </div>
  </div>


      {/* new arrival section */}
    
    <ArrivalSection/>

      {/* <div className='lg:-mt-[200px]   '>
      <h2 className='text-center  pt-10 text-3xl font-extrabold bg-white  '>NEW ARRIVALS</h2>
        <div className="min-h-screen bg-white flex items-center justify-center lg:-mt-20 flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((card, ) => (
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
 
    
      </div> */}

      {/* top seling section */}

< SellingSection/>
      {/* <h2 className='text-center  pt-10 text-3xl font-extrabold bg-white  '>TOP SELLING</h2>
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
     
    </div> */}



    {/* BROWSE BY dress STYLE SECTION */}
    <BrowseByStyle/>
{/*        
    <div className='flex flex-col bg-[#F0F0F0] justify-center  gap-10 rounded-2xl mb-10  
     '>
      <h2 className='text-center pt-10 pb-10 text-3xl font-extrabold'> BROWSE BY DRESS STYLE</h2>
      <div className='flex justify-center gap-10 lg:flex-row flex-col items-center'>
        <div className=' lg:w-1/3  w-1/2 bg-white'> <Image src={"/Frame2.png"} alt='' height={289} width={407}/></div>
        <div className='w-1/2 bg-white '> <Image src={"/Frame1.png"} alt='' height={289} width={684}/></div>
      </div>
      <div className='flex justify-center gap-10 lg:flex-row flex-col items-center'>
        <div className='w-1/2  bg-white'> <Image src={"/Frame 64.png"} alt='' height={289} width={684}/></div>
        <div className=' lg:w-1/3 w-1/2 bg-white '> <Image src={"/Frame 63.png"} alt='' height={289} width={407}/></div>
      </div>
      
    </div> */}

    {/* customer comments */}

    <div>
   
    <CustomerCarousel/>
    </div>
    <Footer /> 
    </main>
  );
}
