// components/ReviewsTab.tsx
import React from "react";

const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Absolutely loved this product! The quality is amazing, and it exceeded my expectations.",
      date: "2024-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "The product is good, but I wish it came in more color options.",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Alice Brown",
      rating: 5,
      comment: "Fast delivery and excellent packaging. Highly recommend it!",
      date: "2024-02-05",
    },
    {
      id: 4,
      name: "Mark Wilson",
      rating: 3,
      comment: "It's okay. The quality could be better for the price.",
      date: "2024-02-12",
    },
    {
      id: 5,
      name: "Emily Davis",
      rating: 2,
      comment: "Not satisfied with the product. It doesn't match the description.",
      date: "2024-03-01",
    },
    {
      id: 6,
      name: "Robert Johnson",
      rating: 4,
      comment: "Great product, but the shipping took too long.",
      date: "2024-03-15",
    },
    {
      id: 7,
      name: "Sophia Lee",
      rating: 5,
      comment: "Fantastic purchase! I’ve been using it for weeks without any issues.",
      date: "2024-03-25",
    },
    {
      id: 8,
      name: "David Martinez",
      rating: 3,
      comment: "Average quality. Not bad, but not great either.",
      date: "2024-04-10",
    },
    {
      id: 9,
      name: "Olivia Garcia",
      rating: 4,
      comment: "Good value for money. Would buy again.",
      date: "2024-04-20",
    },
    {
      id: 10,
      name: "Liam Turner",
      rating: 5,
      comment: "Excellent product! Great build quality and works as described.",
      date: "2024-05-05",
    },
    {
      id: 11,
      name: "Emma Harris",
      rating: 4,
      comment: "Loved it! My kids are enjoying it as well.",
      date: "2024-05-20",
    },
    {
      id: 12,
      name: "Noah Robinson",
      rating: 1,
      comment: "Terrible experience. The product arrived broken.",
      date: "2024-06-01",
    },
  ];
  
   


const ReviewsTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200"
        >
          {/* Rating */}
          <div className="flex items-center space-x-1 text-yellow-500 mb-2">
            {Array(review.rating)
              .fill(0)
              .map((_, index) => (
                <span key={index}>&#9733;</span>
              ))}
            {Array(5 - review.rating)
              .fill(0)
              .map((_, index) => (
                <span key={index} className="text-gray-300">
                  &#9733;
                </span>
              ))}
          </div>

          {/* Viewer Name */}
          <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>

          {/* Comment */}
          <p className="text-gray-600 mt-2">{review.comment}</p>

          {/* Date */}
          <p className="text-sm text-gray-400 mt-4">{review.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;
