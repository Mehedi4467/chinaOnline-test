import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardIconLeft, CardIconRight } from '../icons';
const TopCategory = ({ topCategory }) => {
  return (
    <section className="top-category">
      <h1 className="top-category__heading">Top category</h1>
      <div className="top-category__content">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={0}
          loop={true}
          allowTouchMove={true}
          navigation={{
            nextEl: '.top-category__icon--right',
            prevEl: '.top-category__icon--left',
          }}
          modules={[Navigation]}
          className="top-category__wrapper"
        >
          {topCategory?.map(({ name, icon }, id) => (
            <SwiperSlide className="top-category__main" key={id}>
              <Link href={`/shop/${name}`} className="top-category__link">
                <Image
                  className="top-category__image"
                  src={icon}
                  alt={name}
                  height={182 / 7}
                  width={182 / 7}
                />
                <span className="top-category__name">{name}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="top-category__icons">
          <CardIconLeft
            className="top-category__icon top-category__icon--left"
            size={30}
          />
          <CardIconRight
            className="top-category__icon top-category__icon--right"
            size={30}
          />
        </div>
      </div>
    </section>
  );
};

export default TopCategory;
