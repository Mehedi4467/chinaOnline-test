import React, { useEffect, useRef, useState } from 'react';
import { useValue } from '../../hook/useInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DropDownIcon } from '../icons';
import { dropDown } from '../../data/demo';
import { useStateContext } from '../../context/StateContext';
import useSearch from '../../store/getSearch';

export const ProductsList = React.memo(function ProductsList({ count }) {
  const { searchTitle, selectedId, setSelectedId } = useStateContext();
  const searchHistory = useSearch((state) => state.searchList);
  const addSearchList = useSearch((state) => state.addSearchList);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const maxRef = useRef();
  const minRef = useRef();
  const key = router.query.slug;
  const image = router.query.image_url;
  const maxPrice = router.query.max_price;
  const minPrice = router.query.min_price;
  const [maxNumber, resetmaxNumber, usermaxNumber] = useValue(
    maxPrice ? maxPrice : ''
  );
  const [minNumber, resetminNumber, userminNumber] = useValue(
    minPrice ? minPrice : ''
  );
  const handleItemClick = ({ id, name }) => {
    if (selectedId != id && key != 'imageSearch' && key != '' && name) {
      setSelectedId(id);
      if (name === filterName[id] && id != 0) {
        router.replace(`/shop/${key}?${filterLink[id]}`);
      } else {
        router.replace(`/shop/${key}`);
      }
    }
  };
  const filterLink = ['', ...new Set(dropDown.map((item) => item.link))];
  const filterName = [
    'default',
    ...new Set(dropDown.map((item) => item.name.toLowerCase())),
  ];
  const FilterPrice = (e) => {
    e.preventDefault();
    setSelectedId('');
    if (key != 'imageSearch' && key != '' && (maxNumber || minNumber)) {
      router.replace(
        `/shop/${key}?min_price=${minNumber}&max_price=${maxNumber}`
      );
    }
  };

  useEffect(() => {
    if (
      searchTitle != undefined &&
      searchTitle != null &&
      searchTitle != 'imageSearch' &&
      searchTitle != ''
    ) {
      addSearchList(searchTitle);
    }
  }, [searchTitle]);
  return (
    <div
      className="products__contents"
      onClick={() => {
        isOpen === true && setOpen(false);
      }}
    >
      <div className="products__top-wrapper">
        <div className="products__top-left">
          <h3 className="products__heading">
            {searchTitle ? searchTitle : 'Image Search'}
          </h3>
          <p className="products__subheading">
            products From{' '}
            <span className="products__subheading--span">
              {count ? count : 0}
            </span>{' '}
            {searchTitle ? (
              searchTitle
            ) : (
              <img
                className="products__search-image"
                src={image}
                alt="Image Search"
                height="35"
                width="38"
              />
            )}
          </p>
        </div>
        {key != 'imageSearch' && (
          <div className="products__top-right">
            <div className="products__dropdown">
              <div
                className="products__dropdown-header"
                onClick={() => setOpen(!isOpen)}
              >
                <p className="products__dropdown-heading">
                  {selectedId ? filterName[selectedId] : filterName[0]}
                </p>
                <DropDownIcon
                  className={`products__dropdown-icon ${
                    isOpen && 'products__dropdown-icon--open'
                  }`}
                />
              </div>
              {isOpen ? (
                <div className="products__dropdown-body">
                  {filterName?.map((item, i) => (
                    <p
                      className={`${
                        i == selectedId
                          ? 'products__dropdown-item products__dropdown-item--selected'
                          : 'products__dropdown-item'
                      }`}
                      onClick={() =>
                        handleItemClick({
                          id: i,
                          name: item,
                        })
                      }
                      key={i}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
            <form className="products__price-form" type="POST">
              <input
                className="products__price-input"
                placeholder="Min Price"
                type="text"
                ref={minRef}
                {...userminNumber}
              />
              <input
                className="products__price-input"
                placeholder="Max Price"
                type="text"
                ref={maxRef}
                {...usermaxNumber}
              />
              <button
                onClick={FilterPrice}
                className="products__button"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        )}
      </div>
      {searchTitle && searchHistory && (
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={15}
          loop={false}
          allowTouchMove={true}
          className="products__search-wrapper"
        >
          {searchHistory?.map(({ value }, i) => {
            return (
              <SwiperSlide key={i} className="products__search-main">
                <Link href={`/shop/${value}`} className="products__search">
                  {value}
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
});
export const VendorsList = React.memo(function VendorsList({ count }) {
  const { selectedId, setSelectedId } = useStateContext();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const key = router.query.slug;
  const maxPrice = router.query.max_price;
  const minPrice = router.query.min_price;
  const handleItemClick = ({ id, name }) => {
    if (selectedId != id && key != '' && name) {
      setSelectedId(id);
      if (name === filterName[id] && id != 0) {
        router.replace(`/vendor/${key}?${filterLink[id]}`);
      } else {
        router.replace(`/vendor/${key}`);
      }
    }
  };
  const filterName = [
    'default',
    ...new Set(dropDown.map((item) => item.name.toLowerCase())),
  ];
  const filterLink = ['', ...new Set(dropDown.map((item) => item.link))];
  const maxRef = useRef();
  const minRef = useRef();
  const [maxNumber, resetmaxNumber, usermaxNumber] = useValue(
    maxPrice ? maxPrice : ''
  );
  const [minNumber, resetminNumber, userminNumber] = useValue(
    minPrice ? minPrice : ''
  );
  const FilterPrice = (e) => {
    e.preventDefault();
    setSelectedId('');
    if (key != '' && (maxNumber || minNumber)) {
      router.replace(
        `/vendor/${key}?max_price=${maxNumber}&min_price=${minNumber}`
      );
    }
  };
  return (
    <div
      className="products__contents"
      onClick={() => {
        isOpen === true && setOpen(false);
      }}
    >
      <div className="products__top-wrapper">
        <div className="products__top-left">
          <h3 className="products__heading">{key ? key : 'Vendor Store'}</h3>
          <p className="products__subheading">
            products From{' '}
            <span className="products__subheading--span">
              {count ? count : 0}
            </span>{' '}
            {key ? key : 'Vendor Store'}
          </p>
        </div>
        {key != 'imageSearch' && (
          <div className="products__top-right">
            <div className="products__dropdown">
              <div
                className="products__dropdown-header"
                onClick={() => setOpen(!isOpen)}
              >
                <p className="products__dropdown-heading">
                  {selectedId ? filterName[selectedId] : filterName[0]}
                </p>
                <DropDownIcon
                  className={`products__dropdown-icon ${
                    isOpen && 'products__dropdown-icon--open'
                  }`}
                />
              </div>
              {isOpen ? (
                <div className="products__dropdown-body">
                  {filterName?.map((item, i) => (
                    <p
                      className={`${
                        i == selectedId
                          ? 'products__dropdown-item products__dropdown-item--selected'
                          : 'products__dropdown-item'
                      }`}
                      onClick={() =>
                        handleItemClick({
                          id: i,
                          name: item,
                        })
                      }
                      key={i}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
            <form className="products__price-form" type="POST">
              <input
                className="products__price-input"
                placeholder="Min Price"
                type="text"
                ref={minRef}
                {...userminNumber}
              />
              <input
                className="products__price-input"
                placeholder="Max Price"
                type="text"
                ref={maxRef}
                {...usermaxNumber}
              />
              <button
                onClick={FilterPrice}
                className="products__button"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
});
