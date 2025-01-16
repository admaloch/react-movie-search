import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import React from "react";

interface StarRatingProps {
  starRating: number;
  setStarRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  starRating,
  setStarRating,
}) => {
  return (
    <Rating
      initialRating={starRating.toString()}
      onChange={(rate: number) => setStarRating(rate)}
      emptySymbol={<FaStar size={30} color="#e4e5e9" />}
      fullSymbol={<FaStar size={30} color="#ffc107" />}
      fractions={1}
    />
  );
};

export default StarRating;
