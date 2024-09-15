declare module '*.png';
// declaration.d.ts
declare module 'react-rating' {
    import React from 'react';

    interface RatingProps {
        readonly?: boolean;
        initialRating?: string;
        onChange?: (rate: number) => void;
        emptySymbol?: React.ReactNode;
        fullSymbol?: React.ReactNode;
        fractions?: number;
    }

    const Rating: React.ComponentType<RatingProps>;

    export default Rating;
}
