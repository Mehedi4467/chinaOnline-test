import React from 'react';
import { useStateContext } from '../../context/StateContext';
import Link from 'next/link';
import {
  CategoryIcon,
  ChartIcon,
  PersonIcon,
  PhoneIconSecondery,
} from '../icons';
import Image from 'next/image';
const MobileNav = () => {
  const { showSideBar, setShowSideBar } = useStateContext();
  return (
    <nav className="mobile-nav">
      <div className="container">
        <div className="mobile-nav__wrapper">
          <div
            className="mobile-nav__item-wrapper"
            onClick={() => {
              setShowSideBar(!showSideBar);
            }}
          >
            <CategoryIcon className="mobile-nav__icon" />
            <p className="mobile-nav__text">Category</p>
          </div>
          <Link href="/login" className="mobile-nav__item-wrapper">
            <PersonIcon className="mobile-nav__icon" />
            <p className="mobile-nav__text">Account</p>
          </Link>
          <Link href="/" className="mobile-nav__image-wrapper">
            <Image
              className="mobile-nav__item-image"
              src="/hero-doodle.png"
              alt="site icon"
              quality={100}
              height={280 / 7}
              width={280 / 7}
            />
          </Link>
          <Link href="tel:+8801811677154" className="mobile-nav__item-wrapper">
            <PhoneIconSecondery className="mobile-nav__icon" />
            <p className="mobile-nav__text">Call</p>
          </Link>
          <Link
            href="https://m.me/109012968398097"
            className="mobile-nav__item-wrapper"
            target="_blank"
          >
            <ChartIcon className="mobile-nav__icon" />
            <p className="mobile-nav__text">Chat</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(MobileNav);
