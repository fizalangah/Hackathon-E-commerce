import React from "react";

   export interface ProductCardProps {
  imageUrl: string;
  title: string;
  rating: number; // Between 0 to 5
  price: string;
}


const Card: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  rating,
  price,
}) => {
  return (
    <div className=" w-[295px] h-auto rounded-[20px] p-4 flex flex-col items-center">
      {/* Image */}
      <img
        src={imageUrl}
        alt="Product"
        className="w-[295px] h-[295px] object-cover  bg-[#F0F0F0] rounded-xl"
      />

      {/* Description */}
      <p className="mt-4 text-gray-700 text-center font-bold">{title}</p>

      {/* Rating */}
      <div className="mt-2 flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < rating ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>

      {/* Price */}
      <p className="mt-2 text-gray-900 font-bold">{price}</p>
    </div>
  );
};

export  default Card