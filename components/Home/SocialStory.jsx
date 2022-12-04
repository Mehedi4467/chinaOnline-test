import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper';
import Image from 'next/image';
const SocialStory = ({ social }) => {
  return (
    <div className="hero__Story">
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        allowTouchMove={false}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, '-100%', '100%'],
            opacity: 0,
          },
          next: {
            translate: [0, '100%', 0],
          },
        }}
        autoplay={{
          delay: 4000,
        }}
        modules={[Autoplay, EffectCreative]}
        className="hero__Story-wrapper"
      >
        {social?.map(({ img, link, title }, i) => (
          <SwiperSlide className="hero__Story-image-wrapper" key={i}>
            <Link href={link} target="_blank" title={title}>
              <Image
                src={img}
                alt={title}
                fill
                sizes="(max-width: 1400px) 80vw,
              (min-width: 1600px) 100vw"
                quality={100}
                className="hero__image"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SocialStory;
