import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { BannerLeftIcon, BannerRightIcon } from '../icons';

const Banner = ({ banner }) => {
  return (
    <div className="hero__banner">
      <BannerLeftIcon className="hero__banner-icon hero__banner-icon--left" />
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        allowTouchMove={true}
        loop={true}
        autoplay={{
          delay: 6500,
        }}
        navigation={{
          nextEl: '.hero__banner-icon--right',
          prevEl: '.hero__banner-icon--left',
        }}
        modules={[Navigation, Autoplay]}
        className="hero__banner-wrapper"
      >
        {banner?.map(({ img, title }, i) => (
          <SwiperSlide className="hero__banner-image-wrapper" key={i}>
            <Image
              src={img}
              alt={title}
              fill
              priority={true}
              quality={100}
              sizes="(max-width: 800px) 80vw,
              (min-width: 1600px) 100vw"
              className="hero__image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <BannerRightIcon className="hero__banner-icon hero__banner-icon--right" />
    </div>
  );
};

export default Banner;
