import React from 'react';
const CardMinusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className ? `h-5 w-5 ${className}` : 'h-5 w-5'}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
export default CardMinusIcon;
