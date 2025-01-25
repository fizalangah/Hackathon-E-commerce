"use client";
import React, { useState } from "react";



export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className='py-3 bg-black max-w-screen-xl mx-auto'>
        <div className='lg:justify-center ml-[20px] flex lg:gap-[239px] md:gap-[200px] md:ml-[100px]'>
          <div className='flex text-center gap-2 text-sm lg:text-[14px]'>
            <p className='text-[#FAFAFA] font-[400]'>Signup and get 20% off to your first order.!</p>
            <button className='lg:font-[600] font-[400] underline text-[#FAFAFA]'>Sign Up Now</button>
          </div>

          <div className='hidden lg:block md:block'>
            <button 
              className='text-[24px] font-[400] leading-5 text-[#FAFAFA] flex' 
              onClick={() => setIsVisible(false)}
            >
              x
            </button>
          </div>
        </div>
      </div>
    )
  );
}

