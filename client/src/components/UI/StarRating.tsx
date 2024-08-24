import React from 'react';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ starRating, setStarRating }) => {
    return (

        <Rating
            initialRating={starRating}
            onChange={(rate) => setStarRating(rate)} // Update the form state on change
            emptySymbol={<FaStar size={30} color="#e4e5e9" />}
            fullSymbol={<FaStar size={30} color="#ffc107" />}
            fractions={1} // Only allow whole star ratings
        />

    );
};

export default StarRating;
