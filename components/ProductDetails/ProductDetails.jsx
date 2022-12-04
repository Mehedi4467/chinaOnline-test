import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from '../../hook';
import {
  Count,
  TableRow,
  SingleTableRow,
  TaxShippingTable,
  Ranges,
  LazyImageComp,
  ProductImageDetails,
} from './';
import { Alart, LoginCard, ImageRenderer } from '../';
import {
  AddToCartIcon,
  CopyIcon,
  SellerIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TableScrollIcon,
  VideoPausedIcon,
  WishlistIcon,
} from '../icons';
import { getCharges } from '../../data/demo';
import usewishList from '../../store/getWishlist';
const ProductDetails = React.memo(function ProductDetails({
  data,
  shippingDetails,
  admin,
}) {
  const ref = useRef();
  const history = useRouter();
  const isTab = useMediaQuery('(max-width: 1024px)');
  const updatewishList = usewishList((state) => state.updatewishList);
  // console.log(data);
  const method = 'Air';
  const [table, setTable] = useState([]);
  const [shipping, setShipping] = useState(getCharges(method.toLowerCase())[0]);
  const [shippingTable, setShippingTable] = useState({
    product_quantity: 0,
    total_price: 0,
    weight: 0,
    total_cost: 0,
    pay_now: 0,
    pay_on_delivery: 0,
  });
  const [final, setFinal] = useState([]);
  const [video, setVideo] = useState(false);
  const [popUp, setPopUp] = useState({
    text: '',
    heading: '',
  });
  const [alart, setAlart] = useState(false);
  const [auth, setAuth] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [activeRange, setActiveRange] = useState(0);
  const [rangePrice, setRangePrice] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [cartActive, setCartActive] = useState(false);
  const [cartType, setCartType] = useState(null);
  const [fullTable, setFullTable] = useState(
    data && data.variations ? Object.entries(data.variations) : [],
  );
  const minQty =
    data?.minimum_quantity && data?.minimum_quantity > 1
      ? data.minimum_quantity
      : 1;
  const minPrice =
    data?.minimum_price && data?.minimum_price > 1 ? data.minimum_price : 100;
  const minimumString =
    'সম্মানিত গ্রাহক এই পণ্যটি সর্বনিম্ন ' +
    minQty +
    ' পিস এবং' +
    minPrice +
    ' টাকার অর্ডার করতে হবে।';
  const [current, setCurrent] = useState(
    data && data?.images ? data?.images[0] : '',
  );
  const [selected, setSelected] = useState(null);
  let sortedGroupArray = [];
  let groups = [];
  if (data && data.groups) {
    groups = Object.entries(data.groups);
    sortedGroupArray = groups.sort((a, b) => b[1].has_image - a[1].has_image);
  }
  useEffect(() => {
    let arr = [];
    sortedGroupArray
      .slice(0, groups.length > 1 ? groups.length - 1 : groups.length)
      .forEach((el, index) => {
        arr.push({
          name: el[0],
          value: Object.entries(el[1].values)[0]
            ? Object.entries(el[1].values)[0]
            : [],
        });
      });
    setSelected(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let quan = 0;
    let thisPrice = 0;
    let price = 0;
    final.forEach((p, k) => {
      quan = quan + p.q;
      thisPrice = rangePrice ? rangePrice : p.p;
      price = price + thisPrice * p.q;
    });
    setTotalQuantity(quan);
    if (quan >= minQty && price >= minPrice) {
      setCartActive(true);
      setTotalQuantity(quan);
    } else {
      setCartActive(false);
      setTotalQuantity(quan);
    }
  }, [final, rangePrice]);

  const getMatch = (key, value, type) => {
    if (selected) {
      let index = selected.findIndex(
        (el) => el.name === key && el.value[0] === value,
      );
      if (index >= 0 && type === 'img') return 'product-single__image--active';
      else if (index >= 0 && type === 'span')
        return 'product-single__list-text--active';
    }
    return '';
  };

  const updateCurrentProduct = (key, newValue) => {
    let selectedTmp = [...selected];
    let index1 = selectedTmp.findIndex((el) => {
      return el.name === key;
    });
    if (index1 >= 0) {
      selectedTmp[index1].value = newValue;
    } else {
      selectedTmp.push({ name: key, value: [newValue[0], newValue[1]] });
    }
    setSelected(selectedTmp);
  };

  useEffect(() => {
    if (selected && data && data?.variations) {
      let array = Object.entries(data?.variations);
      selected.forEach((el) => {
        array = array.filter((elm) => elm[1].variants[el.name] === el.value[0]);
      });
      setTable(array);
    }
  }, [selected, data]);

  const getVariationQuantity = (id) => {
    let index = final.findIndex((el) => el.i === id);
    if (index >= 0) {
      return final[index].q;
    } else {
      return 0;
    }
  };

  const getVariationQuantityByType = (type) => {
    let count = 0;
    final.forEach((el) => {
      if (el.d && el.d.includes(type)) {
        count = count + el.q;
      }
    });
    return count;
  };
  const getSelected = (p) => {
    let m = '';
    if (selected && selected.length > 0) {
      let data = [...selected];
      if (data && data.length > 0) {
        let index = data.findIndex((el) => el.name === p);
        if (data[index] && data[index].value) {
          m = data[index].value[0];
        }
      }
    }
    return m;
  };
  const saveCartData = () => {
    if (shipping) {
      const { id, number, token } = admin;
      let product = {};
      product.product_code = data.product_code;
      if (final.length > 0) {
        let productVar = [];
        if (sortedGroupArray && sortedGroupArray.length > 0) {
          // console.log(final);
          final.forEach((el) => {
            productVar.push({
              id: el.i,
              qty: el.q,
              price: rangePrice ? rangePrice : el.p,
              name: el.d[0],
              size: el.d[1],
              img: el.img,
              add_ons: el.a,
            });
          });
          product.variations = JSON.stringify(productVar);
        } else {
          final.forEach((el) => {
            productVar.push({
              qty: el.q,
              price: rangePrice ? rangePrice : el.p,
            });
          });
          product.variations = JSON.stringify(productVar);
        }
      }
      const details = [shipping.method, shippingTable];
      product.shipping_details = JSON.stringify(details);
      product.client_id = id;
      product.phone = number;
      if (product) {
        tryToPlaceOrder(product, token);
      }
    }
  };
  const processCart = (type) => {
    if (!cartActive) {
      setAlart(true);
      setPopUp({
        heading: 'Information',
        text: minimumString,
      });
    } else if (admin) {
      if (type === 'cart' || type === 'buy') {
        setCartType(type);
      }
    } else {
      setAuth(true);
    }
  };
  useEffect(() => {
    if (admin) {
      if (cartType === 'cart') {
        setAlart(true);
        setPopUp({
          heading: 'Information',
          text: 'This feature is coming soon. Stay tuned.',
        });
      }
      if (cartType === 'buy') {
        saveCartData();
      }
    }
  }, [cartType]);

  const processWishlist = () => {
    if (!admin) {
      setAuth(true);
    } else {
      const { id, number, token } = admin;
      manageWishlist(id, number, token);
    }
  };

  const manageWishlist = async (id, number, token) => {
    const Wishlist = {
      phone: number,
      client_id: id,
      access_token: token,
      product_id: history.query.id,
    };
    try {
      const { status, data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard/add/to/wishlist`,
        Wishlist,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          },
        },
      );
      if (status === 200) {
        updatewishList();
        setAlart(true);
        setPopUp({
          heading: 'Information',
          text: 'আপনার পছন্দের পণ্যটি উইশলিস্টে সংযুক্ত হয়েছে',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tryToPlaceOrder = async (product, token) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/product/save/buy/now`,
        product,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
            'Access-Token': token,
          },
        },
      );
      if (data) {
        history.push(`/checkout/${data.payment_token}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      let checkData = {};
      checkData.product_code = data.product_code;
    }
  }, [data]);
  const copyToClipboard = async () => {
    const clipboard = 'https://chinaonlinebd.com' + history.asPath;
    try {
      await navigator.clipboard.writeText(clipboard);
      setAlart(true);
      setPopUp({
        heading: 'Information',
        text: 'আপনার পছন্দের পণ্যের লিঙ্কটি কপি হয়েছে',
      });
    } catch (err) {
      setAlart(true);
      setPopUp({
        heading: 'Information',
        text: 'আপনার পছন্দের পণ্যের লিঙ্কটি কপি হ‍য়নি',
      });
    }
  };

  const getSellerRating = (seller_score) => {
    if (seller_score <= 10) {
      return seller_score + ' / ' + 10;
    } else if (seller_score <= 20) {
      return seller_score + ' / ' + 20;
    } else if (seller_score <= 50) {
      return seller_score + ' / ' + 50;
    } else if (seller_score <= 100) {
      return seller_score + ' / ' + 100;
    }
  };

  return (
    <div className="product-single__content">
      <div className="product-single__content-first-col">
        <div className="product-single__content-images" ref={ref}>
          <ProductImageDetails
            image={current}
            video={video ? data.video_url : ''}
            title={data?.title}
          />
          <div className="product-single__image-slider-wrapper scrollbar-hidden">
            {data?.images.map((p, k) => (
              <div
                key={k}
                onClick={() => {
                  setVideo(false);
                  setCurrent(p);
                }}
              >
                <ImageRenderer
                  divClass="product-single__image-lists"
                  imgClass="product-single__image"
                  url={p}
                  alt={'Image'}
                />
              </div>
            ))}
            {data && data?.video_url && (
              <div
                className="product-single__video-item"
                onClick={() => setVideo(true)}
              >
                <ImageRenderer
                  divClass="product-single__video-list"
                  imgClass="product-single__video-thumbline"
                  url={data?.images[0]}
                  alt={'title'}
                />
                <VideoPausedIcon className="product-single__video-play-icon" />
              </div>
            )}
          </div>
        </div>
        {!isTab && (
          <div className="product-single__info-wrapper">
            <div className="product-single__info-main">
              <h3 className="product-single__info-title">
                Product Code:
                <p className="product-single__info">{data?.product_code}</p>
              </h3>
              <h3 className="product-single__info-title">
                Source:
                <p className="product-single__info">china</p>
              </h3>
              <h3 className="product-single__info-title">
                Category:
                <p className="product-single__info">{data?.category_name}</p>
              </h3>
              {data?.seller.sale && (
                <h3 className="product-single__info-title">
                  Total Sold:
                  <p className="product-single__info">{data?.seller.sale}</p>
                </h3>
              )}
              {data?.seller.rating && (
                <h3 className="product-single__info-title">
                  Seller Score:
                  <p className="product-single__info">
                    {getSellerRating(data?.seller.rating)}
                  </p>
                </h3>
              )}
              <div
                className="product-single__button-wrapper"
                onClick={copyToClipboard}
              >
                <div className="product-single__button">
                  <CopyIcon className="product-single__button-icon" />
                  <p className="product-single__button-text">Copy Link</p>
                </div>
              </div>
            </div>
            <div className="product-single__button-wrapper">
              <Link
                href={`/vendor/${data?.vendor_id}`}
                className="product-single__button"
              >
                <ShoppingBagIcon className="product-single__button-icon" />
                <p className="product-single__button-text">
                  Visit Seller Store
                </p>
              </Link>
              <div className="product-single__button">
                <SellerIcon className="product-single__button-icon" />
                <p className="product-single__button-text">View Sellers</p>
              </div>
              <Link
                href={`/shop/imageSearch?image_url=${data?.image}`}
                className="product-single__button"
              >
                <img
                  className="product-single__search-image"
                  src={data?.image + '_100x100q90.jpg'}
                  alt={data?.title}
                />
                <p className="product-single__button-text">Image Search</p>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="product-single__content-second-col">
        {data?.ranges && data?.ranges.length > 0 && (
          <Ranges
            data={data}
            final={final}
            activeRange={activeRange}
            setActiveRange={setActiveRange}
            setRangePrice={setRangePrice}
            table={table}
            setTable={setTable}
            setFinalPrice={setFinalPrice}
            setFullTable={setFullTable}
            fullTable={fullTable}
          />
        )}
        {sortedGroupArray
          .slice(0, groups.length > 1 ? groups.length - 1 : groups.length)
          .map((p, k) => (
            <div className="product-single__category-list" key={Math.random()}>
              <h2 className="product-single__subheading">
                {p[0] + ' :'} {getSelected(p[0])}
              </h2>
              <div className="product-single__image-lists-wrapper">
                {Object.entries(p[1].values).map((m, l) =>
                  m[1] != '' ? (
                    <div
                      key={l}
                      className={
                        'product-single__image-lists ' +
                        getMatch(p[0], m[0], 'img')
                      }
                      onClick={() => {
                        updateCurrentProduct(p[0], m);
                        let imageUrl = m[1];
                        setCurrent(imageUrl);
                      }}
                    >
                      <LazyImageComp url={m[1]} alt={m[0]} />
                      <Count number={getVariationQuantityByType(m[0])} />
                    </div>
                  ) : (
                    <div
                      key={Math.random()}
                      className={
                        'product-single__list-text ' +
                        getMatch(p[0], m[0], 'span')
                      }
                      onClick={() => {
                        updateCurrentProduct(p[0], m);
                      }}
                    >
                      {m[0]}
                      <Count number={getVariationQuantityByType(m[0])} />
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        {sortedGroupArray && sortedGroupArray.length > 0 ? (
          <div className="product-single__table-wrapper scrollbar-hidden">
            <table className="table">
              <thead>
                <tr>
                  <th>{sortedGroupArray[groups.length - 1][0]}</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {table && table.length > 0 ? (
                  table.map((p, k) => (
                    <TableRow
                      key={p[0]}
                      p={p}
                      id={data.id}
                      product_code={data.product_code}
                      index={k}
                      price={
                        data?.sale_price
                          ? data?.sale_price
                          : data?.regular_price
                      }
                      table={table}
                      setTable={setTable}
                      sortedGroupArray={sortedGroupArray}
                      groups={groups}
                      final={final}
                      setFinal={setFinal}
                      getVariationQuantity={getVariationQuantity}
                      addons={
                        data.add_ons && data.add_ons.length > 0
                          ? data.add_ons
                          : []
                      }
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      please contact with our customer service for further
                      assistance
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="product-single__table-wrapper scrollbar-hidden">
            <table className="table">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <SingleTableRow
                  id={data?.product_code}
                  price={
                    data?.sale_price && parseInt(data?.sale_price) > 0
                      ? data?.sale_price
                      : data?.regular_price
                  }
                  product_code={data?.product_code}
                  final={final}
                  setFinal={setFinal}
                  addons={
                    data && data.add_ons && data.add_ons.length > 0
                      ? data.add_ons
                      : []
                  }
                />
              </tbody>
            </table>
          </div>
        )}
        {table && table.length > 4 && (
          <div className="product-single__table-scroll">
            <p className="product-single__table-scroll-text">Scroll More</p>
            <TableScrollIcon className="product-single__table-scroll-icon" />
          </div>
        )}
        <div className="product-single__shipping-details">
          <div className="product-single__shipping-details-wrapper">
            <div className="product-single__shipping-detail">
              <h2 className="product-single__shipping-detail-heading">
                {shippingDetails?.shipping_details.cost_primary} টাকা{' '}
                {shippingDetails?.shipping_details.kg_primary}
              </h2>
              <p className="product-single__shipping-detail-text">
                {shippingDetails?.shipping_details.details_primary}
              </p>
            </div>
            <div className="product-single__shipping-detail">
              <h2 className="product-single__shipping-detail-heading">
                {shippingDetails?.shipping_details.cost_secondary} টাকা{' '}
                {shippingDetails?.shipping_details.kg_secondary}
              </h2>
              <p className="product-single__shipping-detail-text">
                {shippingDetails?.shipping_details.details_secondary}
              </p>
            </div>
          </div>
          <p className="product-single__shipping-notice">
            ** {shippingDetails?.shipping_details.note}
          </p>
          <p className="product-single__shipping-wight-text">
            <span className="product-single__shipping-notice">** </span>
            প্রতি পিস পণ্যের ওজন:{' '}
            <span className="product-single__shipping-notice">
              {data?.Weight && data.Weight}
            </span>
            {' কেজি (আনুমানিক)'}
          </p>
        </div>
        <TaxShippingTable
          data={data}
          final={final}
          shipping={shipping ? shipping : ''}
          setShipping={setShipping}
          rangePrice={rangePrice}
          finalPrice={finalPrice}
          setFinalPrice={setFinalPrice}
          setShippingTable={setShippingTable}
        />
        {isTab ? (
          <div className="product-single__info-wrapper">
            <div className="product-single__info-main">
              <h3 className="product-single__info-title">
                Product Code:
                <p className="product-single__info">{data?.product_code}</p>
              </h3>
              <h3 className="product-single__info-title">
                Source:
                <p className="product-single__info">china</p>
              </h3>
              <h3 className="product-single__info-title">
                Category:
                <p className="product-single__info">{data?.category_name}</p>
              </h3>
              {data?.seller.sale && (
                <h3 className="product-single__info-title">
                  Total Sold:
                  <p className="product-single__info">{data?.seller.sale}</p>
                </h3>
              )}
              {data?.seller.rating && (
                <h3 className="product-single__info-title">
                  Seller Score:
                  <p className="product-single__info">
                    {getSellerRating(data?.seller.rating)}
                  </p>
                </h3>
              )}
              <div
                className="product-single__button-wrapper"
                onClick={copyToClipboard}
              >
                <div className="product-single__button">
                  <CopyIcon className="product-single__button-icon" />
                  <p className="product-single__button-text">Copy Link</p>
                </div>
              </div>
            </div>
            <div className="product-single__button-wrapper">
              <Link
                href={`/vendor/${data?.vendor_id}`}
                className="product-single__button"
              >
                <ShoppingBagIcon className="product-single__button-icon" />
                <p className="product-single__button-text">
                  Visit Seller Store
                </p>
              </Link>
              <div className="product-single__button">
                <SellerIcon className="product-single__button-icon" />
                <p className="product-single__button-text">View Sellers</p>
              </div>
              <Link
                href={`/shop/imageSearch?image_url=${data?.image}`}
                className="product-single__button"
              >
                <img
                  className="product-single__search-image"
                  src={data?.image}
                  alt={data?.title}
                />
                <p className="product-single__button-text">Image Search</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="product-single__button-wrapper">
            <div
              className="product-single__button"
              onClick={() => processWishlist()}
            >
              <WishlistIcon className="product-single__button-icon" />
              <div className="product-single__button-text">Save</div>
            </div>
            <div
              className="product-single__button"
              onClick={() => {
                processCart('cart');
              }}
            >
              <AddToCartIcon className="product-single__button-icon" />
              <div className="product-single__button-text">Add to Cart</div>
            </div>
            <div
              className="product-single__button"
              onClick={() => processCart('buy')}
            >
              <ShoppingCartIcon className="product-single__button-icon" />
              <div className="product-single__button-text">Buy Now</div>
            </div>
          </div>
        )}
      </div>
      {alart && (
        <Alart
          heading={popUp?.heading}
          text={popUp?.text}
          close={() => setAlart(false)}
        />
      )}
      {auth && (
        <section className="alart">
          <LoginCard setAuth={setAuth} />
        </section>
      )}
      {isTab && (
        <div className="mobile-nav__wrapper mobile-nav__secondery-wrapper">
          <div
            className="mobile-nav__item-wrapper"
            onClick={() => processWishlist()}
          >
            <WishlistIcon className="mobile-nav__icon" />
            <p className="mobile-nav__text">Save</p>
          </div>
          <div
            className="mobile-nav__item-wrapper"
            onClick={() => {
              processCart('cart');
            }}
          >
            <AddToCartIcon className="mobile-nav__icon" />
            <p className="mobile-nav__text">Add to Cart</p>
          </div>
          <div
            className="mobile-nav__item-wrapper"
            onClick={() => processCart('buy')}
          >
            <ShoppingCartIcon className="mobile-nav__icon" />
            <p className="mobile-nav__text">Buy Now</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default ProductDetails;
