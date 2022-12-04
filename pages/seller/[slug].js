import React, { useEffect, useRef, useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Layout } from '../../layout';
import { dynamicSection } from '../../components/DynamicComponent';
import { ProductList } from '../../components/Loader';
import { DropDownIcon } from '../../components/icons';
import { dropDown } from '../../data/demo';
import Pagination from '../../components/Pagination';
const seller = () => {
  const CardDynamic = dynamicSection.card;
  const router = useRouter();
  const { searchTitle, setSearchTitle, selectedId, setSelectedId } =
    useStateContext();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState();
  const [pageCount, setPageCount] = useState();
  const [rate, setRate] = useState();
  const [count, setCount] = useState();
  const [isOpen, setOpen] = useState(false);
  const [number, setNumber] = useState({
    maxNumber: '',
    minNumber: '',
  });
  let name, value;
  const filterName = [
    'default',
    ...new Set(dropDown.map((item) => item.name.toLowerCase())),
  ];
  const filterLink = ['', ...new Set(dropDown.map((item) => item.link))];
  const getNumber = (event) => {
    name = event.target.name;
    value = event.target.value.replace(/\D/g, '');
    if (event.target) {
      setNumber({ ...number, [name]: value });
    }
  };
  const searchData = async (url) => {
    console.log(url);
    setLoading(true);
    try {
      const { data } = await axios.get(url, {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
      });
      if (data) {
        // console.log(data);
        const rmb = data.rate;
        const itm = data.result.Items.Content;
        const qty = data.result.Items.TotalCount;
        const pge = data.result.MaximumPageCount;
        setItems(itm);
        setPageCount(pge);
        setRate(rmb);
        setCount(qty);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const key = router.query.slug;
  const sort = router.query.sort_status;
  const direction = router.query.direction;
  const discountStatus = router.query.discount_status;
  const maxPrice = router.query.max_price;
  const minPrice = router.query.min_price;
  const [currentPage, setCurrentPage] = useState(
    Number(router.query.page) || 1,
  );
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
  const FilterPrice = (e) => {
    e.preventDefault();
    setSelectedId('');
    if (key != '' && (number.maxNumber || number.minNumber)) {
      router.replace(
        `/vendor/${key}?max_price=${number.maxNumber}&min_price=${number.minNumber}`,
      );
    }
  };
  const callOne = useRef(true);
  useEffect(() => {
    if (callOne.current) {
      callOne.current = false;
      if (key != '') {
        if (sort || direction || discountStatus) {
          if (
            sort &&
            sort != '' &&
            direction &&
            direction != '' &&
            !discountStatus
          ) {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search?search=${key}&sort=${sort}&direction=${direction}&page=${currentPage}`;
            setSearchTitle(key);
            searchData(url);
          }
          if (sort && sort != '' && !direction && !discountStatus) {
            if (currentPage) {
              const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search?search=${key}&sort=${sort}&page=${currentPage}`;
              setSearchTitle(key);
              searchData(url);
            } else {
              const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search?search=${key}&sort=${sort}`;
              setSearchTitle(key);
              searchData(url);
            }
          }
          if (!sort && !direction && discountStatus) {
            if (currentPage) {
              const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search?search=${key}&discount_status=${discountStatus}&page=${currentPage}`;
              {
                !selectedId && setSelectedId(3);
              }
              setSearchTitle(key);
              searchData(url);
            } else {
              const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search?search=${key}&discount_status=${discountStatus}`;
              {
                !selectedId && setSelectedId(3);
              }
              setSearchTitle(key);
              searchData(url);
            }
          }
        } else if (maxPrice || minPrice) {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search?search=${key}&max_price=${maxPrice}&min_price=${minPrice}&page=${currentPage}`;
          setSearchTitle(key);
          searchData(url);
        } else {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/get/product/list/search?search=${key}&page=${currentPage}`;
          setSearchTitle(key);
          searchData(url);
        }
      } else {
        router.push('/404');
      }
    }
  }, [key, sort, direction, maxPrice, minPrice, currentPage]);
  console.log(pageCount);
  return (
    <Layout title={searchTitle} description={`${searchTitle} List page`}>
      <section
        className="products"
        onClick={() => {
          isOpen === true && setOpen(false);
        }}
      >
        <div className="products__contents">
          <div className="products__top-wrapper">
            <div className="products__top-left">
              <h3 className="products__heading">{searchTitle}</h3>
              <p className="products__subheading">
                SELLER{' '}
                <span className="products__subheading--span">{count}</span>{' '}
                {searchTitle}
              </p>
            </div>
            {key != '' && (
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
                          id={i}
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
                    name="minNumber"
                    value={number.minNumber}
                    onChange={getNumber}
                  />
                  <input
                    className="products__price-input"
                    placeholder="Max Price"
                    type="text"
                    name="maxNumber"
                    value={number.maxNumber}
                    onChange={getNumber}
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
        {loading ? (
          <ProductList />
        ) : (
          <>
            {items != '' ? (
              <div className="products__card-wrapper">
                <CardDynamic
                  data={items}
                  rate={rate}
                  searchTitle={searchTitle}
                />
              </div>
            ) : (
              <div className="products__card-empty-wrapper">
                <div className="products__card-empty-image-wrapper">
                  <img
                    className="products__card-empty-image"
                    src="empty-busket.png"
                    alt="empty-busket"
                  />
                  <a className="visually-hidden" href="http://www.freepik.com">
                    Designed by stories / Freepik
                  </a>
                </div>
                <h3 className="products__heading products__heading--secondery">
                  Product Not found
                </h3>
              </div>
            )}
            {pageCount > 1 ? (
              <Pagination
                total={pageCount}
                current={currentPage === 0 ? currentPage + 1 : currentPage}
              />
            ) : (
              ''
            )}
          </>
        )}
      </section>
    </Layout>
  );
};
export default seller;
