import React, { useState } from 'react';

export default function LazyImageComp({ url, alt }) {
  const [isLoading, setIsLoading] = useState(true);
  let imageUrl = url;
  imageUrl = url + '_100x100q90.jpg';
  return (
    <figure className="product-single__image-list">
      <img
        className="product-single__image"
        onLoad={() => {
          if (isLoading) {
            setIsLoading(false);
          }
        }}
        src={imageUrl}
        alt={alt}
      />
    </figure>
  );
}
