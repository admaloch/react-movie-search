import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import React from 'react';

// Define the props interface for StarRating
interface StarRatingProps {
    starRating: number; // The current rating value (number)
    setStarRating: (rating: number) => void; // Function to update the rating
}

const StarRating: React.FC<StarRatingProps> = ({ starRating, setStarRating }) => {
    return (
        <Rating
            initialRating={starRating}
            onChange={(rate) => setStarRating(rate)} // Update the form state on change
            emptySymbol={<FaStar size={30} color="#e4e5e9" />} // Empty star symbol
            fullSymbol={<FaStar size={30} color="#ffc107" />}  // Full star symbol
            fractions={1} // Only allow whole star ratings
        />
    );
};

export default StarRating;
