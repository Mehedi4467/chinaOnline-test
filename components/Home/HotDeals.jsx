import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from '../../hook';
import { dynamicSection } from '../DynamicComponent';
const HotDeals = ({ deals, video }) => {
  const StoryDynamic = dynamicSection.Story;
  const CountDownDynamic = dynamicSection.CountDown;
  const isMobile = useMediaQuery('(max-width: 650px)');
  function calculateTimeLeft() {
    const offerDate = new Date(
      `${deals?.deal_times.year}-${deals?.deal_times.month}-${deals?.deal_times.date}`,
    );
    const difference = +offerDate - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });
  const timerComponents = Object.keys(timeLeft).map((interval, i) => {
    const [time, setTime] = useState(0);
    useEffect(() => {
      setTime(timeLeft[interval]);
    }, [timeLeft[interval]]);
    return (
      <div className="hot-deals__count-time-wrapper" key={i}>
        <p className="hot-deals__count-number">{time}</p>
        <p className="hot-deals__count-label">{interval}</p>
      </div>
    );
  });
  return (
    <>
      {deals?.status ? (
        <section className="hot-deals">
          <div className="hot-deals__main">
            <CountDownDynamic timerComponents={timerComponents} />
            {isMobile && (
              <h2 className="hot-deals__heading">
                {deals?.deal_detail.deal_name}
              </h2>
            )}
            <div className="hot-deals__wrapper">
              {!isMobile && (
                <figure className="hot-deals__banner-wrapper">
                  <Image
                    className="hot-deals__banner"
                    src={deals?.deal_detail.deal_img}
                    alt="Banner"
                    height={2100 / 7}
                    width={1435 / 7}
                  />
                </figure>
              )}
              <div className="hot-deals__items">
                <Swiper
                  slidesPerView={'auto'}
                  spaceBetween={10}
                  loop={true}
                  allowTouchMove={true}
                  autoplay={{
                    delay: 2000,
                  }}
                  breakpoints={{
                    650: {
                      spaceBetween: 20,
                    },
                  }}
                  modules={[Autoplay]}
                  className="hot-deals__cards"
                >
                  {deals?.deal_item_list.map(
                    ({ item_id, item_img, item_name, item_off_percent }) => (
                      <SwiperSlide className="hot-deals__card" key={item_id}>
                        <Link
                          href={`/shop/${item_name}?discount_status=true`}
                          className="hot-deals__card-image-wrapper"
                        >
                          <Image
                            src={item_img}
                            alt={item_name}
                            height={1680 / 7}
                            width={1400 / 7}
                            className="hot-deals__card-image"
                          />
                          <div className="hot-deals__offer-wrapper">
                            <p className="hot-deals__offer">
                              Upto {item_off_percent}% Off
                            </p>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <StoryDynamic video={video} />
      )}
    </>
  );
};

export default HotDeals;
