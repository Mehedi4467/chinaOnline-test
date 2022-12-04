import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TypeWriter } from '..';
import { useMediaQuery } from '../../hook';
import { useInput } from '../../hook/useInput';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  CameraIcon,
  PersonIcon,
  SearchIcon,
  ShoppingCartIcon,
  WishlistIcon,
} from '../icons';
import NextImage from 'next/image';
import useSearch from '../../store/getSearch';
import usewishList from '../../store/getWishlist';

const Header = ({ msgs, siteConfig }) => {
  const { pathname } = useRouter();
  const router = useRouter();
  const inputRef = useRef();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const key = router.query.slug || router.query.id;
  const [search, resetSearch, userSearch] = useInput(key ? key : '');
  // Search Item
  const [inputClick, setInputClick] = useState(false);
  const searchHistory = useSearch((state) => state.searchList);
  const totalwishList = usewishList((state) => state.totalwishList);
  const clickInput = (e) => {
    if (e.target.type === 'text') {
      setInputClick(true);
    } else {
      setInputClick(false);
    }
  };
  const searchButton = async (e) => {
    e.preventDefault();
    if (inputRef) {
      if (search !== '') {
        if (search.includes('abb-') || search.includes('Abb-')) {
          let productCode = search.replace(/\s/g, '').toLowerCase();
          router.push(`/product/${productCode}`, undefined, {
            shallow: true,
          });
        } else if (search.includes('alb-') || search.includes('Alb-')) {
          let productCode = search.replace(/\s/g, '').toLowerCase();
          router.push(`/product/${productCode}`, undefined, {
            shallow: true,
          });
        } else {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search/save/rank`;
          const paramiter = { search: search };
          try {
            await axios.get(url, {
              params: paramiter,
              headers: {
                token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
              },
            });
          } catch (error) {
            if (error.response.status != 200 && error.response.status != 401) {
              console.log('wrong search');
            }
          }
          if (pathname === '/shop') {
            router.replace(`/shop/${encodeURI(search)}`, undefined, {
              shallow: true,
            });
          } else if (pathname != '/shop') {
            router.push(`/shop/${encodeURI(search)}`, undefined, {
              shallow: true,
            });
          } else {
            router.push('/404');
          }
        }
      }
    }
  };
  // Image Upload
  const hiddenFileInput = useRef(null);
  const handlefile = () => {
    hiddenFileInput.current.click();
  };
  const setImage = async (formdata) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/by/image/search`,
        formdata,
        {
          headers: {
            'content-type': 'multipart/form-data',
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          },
        },
      );
      if (data) {
        if (pathname != '/shop') {
          router.push(`/shop/imageSearch?image_url=${data.image}`, undefined, {
            shallow: true,
          });
        } else if (pathname === '/shop') {
          router.replace(
            `/shop/imageSearch?image_url=${data.image}`,
            undefined,
            { shallow: true },
          );
        } else {
          router.push('/404');
        }
      }
    } catch (error) {
      if (error.status != 200) {
        alert('image search wents wrong');
      }
    }
  };
  const handlefileUpload = (e) => {
    e.preventDefault();
    if (e.target && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageFilename = e.target.files[0].name;
      let reader = new FileReader();
      if (imageFile) {
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var MAX_WIDTH = 1152;
            var MAX_HEIGHT = 648;
            var width = img.width;
            var height = img.height;
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            ctx.canvas.toBlob(
              (blob) => {
                const file = new File([blob], imageFilename, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                const formdata = new FormData();
                formdata.append('image', file);
                if (file != '' && file) {
                  setImage(formdata);
                }
              },
              'image/jpeg',
              1,
            );
          };
          //debugger
          img.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
      }
    }
  };
  // Header Sticky scroll event listener
  const [sticky, setSticky] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('');
  const headerRef = useRef(null);
  useEffect(() => {
    var header = headerRef.current.getBoundingClientRect();
    let lastScrollY = window.pageYOffset;
    const handleScrollEvent = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
        setInputClick(false);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      if (window.pageYOffset > header.height) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [sticky, scrollDirection]);
  const [wishListCount, setWishListCount] = useState(0);
  useEffect(() => {
    setWishListCount(totalwishList);
  }, [totalwishList]);
  return (
    <header
      className={`${sticky ? 'header header--sticky' : 'header'}`}
      ref={headerRef}
    >
      <div className="container">
        {isMobile && scrollDirection === 'down' ? (
          ''
        ) : (
          <div className="header__first-row">
            <Link href="/" className="header__log-wrapper">
              <NextImage
                src={siteConfig?.header.header_logo}
                alt={siteConfig?.header.header_title}
                width={4800 / 7}
                height={2800 / 7}
                quality={100}
                className="header__log"
              />
            </Link>
            {!isMobile && (
              <form
                method="POST"
                className="header__search-wrapper"
                onClick={clickInput}
              >
                <div className="header__input-wrapper">
                  <label htmlFor="search" className="visually-hidden">
                    input
                  </label>
                  {inputClick ? (
                    <>
                      <input
                        className="header__input"
                        type="text"
                        id="search"
                        ref={inputRef}
                        {...userSearch}
                        required
                        autoComplete="off"
                        list="history"
                      />
                      <datalist id="history">
                        {searchHistory?.slice(0, 5).map(({ value }, i) => (
                          <option value={value} key={i}></option>
                        ))}
                      </datalist>
                    </>
                  ) : (
                    <TypeWriter heading={'Search'} messages={msgs} />
                  )}
                </div>
                <div className="header__search-icon-wrapper">
                  <div className="header__search-icon" onClick={handlefile}>
                    <CameraIcon />
                    <label htmlFor="file" className="visually-hidden">
                      search by image
                    </label>
                    <input
                      className="visually-hidden"
                      type="file"
                      id="file"
                      name="picture"
                      accept="image/*"
                      ref={hiddenFileInput}
                      onChange={handlefileUpload}
                    />
                  </div>
                  <div className="header__search-icon">
                    <button
                      type="submit"
                      className="header__search-icon-button"
                      onClick={searchButton}
                    >
                      <p className="visually-hidden"> search Button</p>
                    </button>
                    <SearchIcon />
                  </div>
                </div>
              </form>
            )}
            <div className="header__icon-wrapper">
              <Link href="/cart" className="header__icon-main" datacount="0">
                <ShoppingCartIcon className="header__icon" />
              </Link>
              <Link
                href="/wishlist"
                className="header__icon-main"
                datacount={totalwishList && wishListCount ? wishListCount : 0}
              >
                <WishlistIcon className="header__icon" />
              </Link>
              <Link href="/login">
                <PersonIcon className="header__icon" />
                <p className="visually-hidden">Person Icon</p>
              </Link>
            </div>
          </div>
        )}
        {isMobile && (
          <div className="header__second-row">
            <form
              method="POST"
              className="header__search-wrapper"
              onClick={clickInput}
            >
              <div className="header__input-wrapper">
                <label htmlFor="search" className="visually-hidden">
                  input
                </label>
                {inputClick ? (
                  <>
                    <input
                      className="header__input"
                      type="text"
                      id="search"
                      ref={inputRef}
                      {...userSearch}
                      required
                      autoComplete="off"
                      list="history"
                    />
                    <datalist id="history">
                      {searchHistory?.slice(0, 5).map(({ value }, i) => (
                        <option value={value} key={i}></option>
                      ))}
                    </datalist>
                  </>
                ) : (
                  <TypeWriter heading={'Search'} messages={msgs} />
                )}
              </div>
              <div className="header__search-icon-wrapper">
                <div className="header__search-icon" onClick={handlefile}>
                  <CameraIcon />
                  <label htmlFor="file" className="visually-hidden">
                    search by image
                  </label>
                  <input
                    className="visually-hidden"
                    type="file"
                    id="file"
                    name="picture"
                    accept="image/*"
                    ref={hiddenFileInput}
                    onChange={handlefileUpload}
                  />
                </div>
                <div className="header__search-icon">
                  <button
                    type="submit"
                    className="header__search-icon-button"
                    onClick={searchButton}
                  ></button>
                  <SearchIcon />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
