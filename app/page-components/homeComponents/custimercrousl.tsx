"use client";

import React, { useState } from "react";

const CustomerCarousel = () => {
  const customers = [
    { name: "John Doe", comment: "Great service, highly recommended!", rating: 5 },
    { name: "Jane Smith", comment: "Amazing quality products!", rating: 4 },
    { name: "James Brown", comment: "Will definitely shop again!", rating: 5 },
    { name: "Linda Johnson", comment: "Love the designs, keep it up!", rating: 4 },
    { name: "Mike Davis", comment: "Great customer support.", rating: 5 },
    { name: "Nancy Wilson", comment: "Fast delivery, very satisfied!", rating: 4 },
    { name: "Robert Miller", comment: "Good prices and quality.", rating: 4 },
    { name: "Emily Moore", comment: "Definitely recommend it!", rating: 5 },
    { name: "David Taylor", comment: "Loved the experience!", rating: 5 },
    { name: "Sarah Harris", comment: "Quick and easy shopping!", rating: 4 }
  ];

  const [startIndex, setStartIndex] = useState(0);

  // Function to handle the next button
  const nextSlide = () => {
    if (startIndex + 5 < customers.length) {
      setStartIndex(startIndex + 1);
    }
  };

  // Function to handle the previous button
  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-${index < rating ? "yellow-400" : "gray-300"}`}>★</span>
    ));
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-5 py-10">
      {/* Previous Button */}
      <h2 className='text-left  text-3xl font-extrabold pl-10'>  OUR HAPPY CUSTOMERS</h2>
      <div className=" pb-10 space-x-2 flex ">
      <button
        className=" z-10 text-gray-500 bg-white rounded-full p-2 hover:bg-gray-200"
        onClick={prevSlide}
      >
        <span className="text-xl">&lt;</span>
      </button>
      <button
        className="  z-10 text-gray-500 bg-white rounded-full p-2 hover:bg-gray-200"
        onClick={nextSlide}
      >
        <span className="text-xl">&gt;</span>
      </button>
      </div>
      {/* Customer Cards */}
      <div className="flex space-x-5 overflow-x-auto">
        {customers.slice(startIndex, startIndex + 4).map((customer, index) => (
          <div key={index} className="flex flex-col items-center justify-between bg-white p-5  shadow-md w-[600px] h-[200px] border-[#f0f0f0fb] rounded-2xl">
            <div className="flex flex-col items-center space-y-3">
              {/* Rating */}
              <div className="flex justify-center">
                {renderStars(customer.rating)}
              </div>

              {/* Customer Name */}
              <h3 className="font-semibold text-lg">{customer.name}</h3>

              {/* Customer Comment */}
              <p className="text-center text-gray-600">{customer.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
     
    </div>
  );
};

export default CustomerCarousel;
