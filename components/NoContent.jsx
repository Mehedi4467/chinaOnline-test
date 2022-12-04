import React from 'react';
import Image from 'next/image';

const NoContent = ({ alt, src, height, width }) => {
  return (
    <figure className="empty__image-wrapper">
      <Image
        className="empty__image"
        height={height}
        width={width}
        src={src}
        priority={true}
        quality={100}
        alt={alt}
      />
      <a className="visually-hidden" href="http://www.freepik.com">
        Designed by / Freepik
      </a>
    </figure>
  );
};

export default NoContent;
