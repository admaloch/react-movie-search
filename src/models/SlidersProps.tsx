import React from 'react';

export default interface SlidersProps {
    mouseEnter: (event: React.MouseEvent) => void;
    mouseLeave: (event: React.MouseEvent) => void;
    mobileTouch: (event: React.TouchEvent) => void;
    mobileLeave: (event: React.TouchEvent) => void;
}