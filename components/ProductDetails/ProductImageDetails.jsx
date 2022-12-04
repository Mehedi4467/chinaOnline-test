import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useMediaQuery } from '../../hook';
import { ImageRenderer } from '../';

const ProductImageDetails = ({ image, video, title }) => {
  const [bg, setBg] = useState();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBg({
      backgroundImage: `url(${e.target.src})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };
  let imageUrl = image;
  imageUrl = image + '_600x600q90.jpg';
  return (
    <>
      {video ? (
        <div className="product-single__video-wrapper">
          <ReactPlayer
            controls={true}
            url={video}
            className="product-single__video"
          />
        </div>
      ) : (
        <>
          {isMobile ? (
            <ImageRenderer
              divClass="product-single__image-main-wrapper"
              imgClass="product-single__image-main"
              url={imageUrl}
              alt={title}
            />
          ) : (
            <div
              className="product-single__image-main-wrapper"
              onMouseMove={handleMouseMove}
              style={
                bg
                  ? bg
                  : {
                      backgroundImage: `url(${imageUrl})`,
                    }
              }
            >
              <img
                className="product-single__image-main"
                src={imageUrl}
                alt={title}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductImageDetails;
