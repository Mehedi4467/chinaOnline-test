import React, { useState, useRef } from 'react';
import { useIntersection } from '../hook/IntersectionObserver';

const ImageRenderer = ({ alt, url, size, imgClass, divClass }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });
  let imageUrl = url;
  if (size) {
    imageUrl = url + size;
  }
  return (
    <figure className={divClass && divClass} ref={imgRef}>
      {isInView && (
        <img
          className={isLoaded ? `${imgClass}` : 'loader__thumb'}
          src={isLoaded ? imageUrl : '/thumb.png'}
          alt={isLoaded ? alt : 'thumb image'}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
      )}
    </figure>
  );
};

export default React.memo(ImageRenderer);
