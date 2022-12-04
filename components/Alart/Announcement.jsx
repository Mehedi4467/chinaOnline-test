import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CrossIcons } from '../icons';

const Announcement = ({ announcement: { img, title } }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      {show && (
        <div className="announcement">
          <div
            className="announcement__bg"
            onClick={() => setShow(false)}
          ></div>
          <div className="announcement__wrapper">
            <div
              className="announcement__icon-wrapper"
              onClick={() => setShow(false)}
            >
              <CrossIcons className="announcement__icon" />
            </div>
            <Image
              className="announcement__image"
              src={img}
              alt={title}
              fill
              priority={true}
              quality={100}
              sizes="(max-width: 800px) 80vw,
              (min-width: 1600px) 100vw"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Announcement;
