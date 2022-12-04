import React from 'react';
const ProductSmallImage = ({ className }) => (
  <div
    className={className ? `loader__image ${className}` : 'loader__image'}
  ></div>
);
export default ProductSmallImage;
