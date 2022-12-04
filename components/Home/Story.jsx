import Image from 'next/image';
import React, { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Popup } from '..';
import { CardIconLeft, CardIconRight } from '../icons';
const Story = ({ video }) => {
  const [showModal, setShowModal] = useState(false);
  const [card, setCard] = useState('');
  const showPopup = (item) => {
    setShowModal(true);
    setCard(item);
  };
  return (
    <section className="story">
      <div className="story__cards-wrapper">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          loop={true}
          allowTouchMove={true}
          centeredSlides={true}
          navigation={{
            nextEl: '.story__cards-icon--right',
            prevEl: '.story__cards-icon--left',
          }}
          modules={[Navigation]}
          className="story__cards"
        >
          {video?.map((item, i) => (
            <SwiperSlide
              className="story__card"
              key={i}
              onClick={() => showPopup(item)}
            >
              <div className="story__card-image-wrapper">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 800px) 80vw,
              (min-width: 1600px) 100vw"
                  className="story__card-image"
                />
              </div>
              <div className="story__card-text-wrapper">
                <p className="story__card-text">{item.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="story__cards-icons">
          <CardIconLeft className="story__cards-icon story__cards-icon--left" />
          <CardIconRight className="story__cards-icon story__cards-icon--right" />
        </div>
      </div>
      {showModal && (
        <Popup data={card} closeModal={() => setShowModal(false)} />
      )}
    </section>
  );
};
export default Story;
