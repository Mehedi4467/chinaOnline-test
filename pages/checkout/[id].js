import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { CheckoutCostTable, CartHeader, CheckoutTable } from '../../components';
import { Layout } from '../../layout';
import { districtName, methodName } from '../../data/demo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DetailLine } from '../../components/Loader';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../actions';
import {
  Alart,
  ImageRenderer,
  CheckoutForm,
  NoContent,
} from '../../components';

const checkout = ({ user, shippingDetails }) => {
  const router = useRouter();
  const [popUp, setPopUp] = useState({
    text: '',
    heading: '',
  });
  const [close, setClose] = useState(false);
  const [clientOrders, setClientOrders] = useState({
    product_items: '',
    prices: '',
  });
  const orderId = router.query.id;
  const [userInput, setUserInput] = useState({
    name: '',
    address: '',
    phone: '',
    emergnecy_number: '',
    city: '',
    email: '',
    district: '',
    delivery_method: '',
  });
  const finalCheckout = async (orderidMain) => {
    const { id, number, token } = user;
    const {
      name,
      address,
      emergnecy_number,
      city,
      email,
      district,
      delivery_method,
    } = userInput;
    const order = {
      client_id: id,
      phone: number,
      name,
      emergency_phone: emergnecy_number,
      district,
      city_upazila: city,
      address,
      delivery_method,
      email,
      order_id: [orderidMain],
    };

    try {
      const { data, status } = await axios.post('/api/checkout/form', order, {
        headers: {
          token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          'Access-Token': token,
        },
      });
      if (data && status === 200) {
        router.push(
          `https://chinaonlineapi.com/payment/method?token=${orderId}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const payNow = (e) => {
    e.preventDefault();
    const orderidMain = clientOrders.product_items[0].order_id;
    if (userInput?.address && userInput?.name) {
      finalCheckout(orderidMain);
    } else {
      setClose(true);
      setPopUp({
        heading: 'Information',
        text: 'Dear customer all inputs are required to purchase this product.',
      });
    }
  };
  const searchData = async (url) => {
    const { data } = await axios.get(url, {
      headers: {
        token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    return data;
  };
  const [mainUrl, setMainUrl] = useState('');
  useEffect(() => {
    if (orderId && orderId != '') {
      const url = `/api/checkout/order?order_id=${orderId}`;
      setMainUrl(url);
    }
  }, [orderId, user]);

  const { isLoading, isFetching, error, data } = useQuery(
    ['searchData', mainUrl],
    () => searchData(mainUrl),
    {
      enabled: Boolean(mainUrl),
    },
  );
  if (error) {
    console.log(error);
  }
  useMemo(() => {
    if (data) {
      setClientOrders({
        product_items: data?.get_product_details,
        prices: data?.total_bill,
      });
      setUserInput(data?.client_details);
    }
  }, [data]);
  return (
    <Layout title="Checkout" description="Checkout Page">
      <section className="checkout">
        <CartHeader heading="Checkout" icon={true} />
        {isLoading && isFetching ? (
          <div className="checkout__contents">
            <div className="checkout__column-one loader__checkout">
              <DetailLine />
            </div>
            <div className="checkout__column-two loader__checkout">
              <DetailLine />
            </div>
          </div>
        ) : (
          <>
            {data && clientOrders ? (
              <div className="checkout__contents">
                <div className="checkout__column-one">
                  <CheckoutForm
                    districtName={districtName}
                    methodName={methodName}
                    userInput={userInput}
                    setUserInput={setUserInput}
                  />
                  <h2 className="checkout__orders-heading">From China</h2>
                  {clientOrders && clientOrders?.product_items && (
                    <div className="checkout__orders">
                      {clientOrders?.product_items?.map(
                        (
                          { id, img, name, order_id, title, price, qunatity },
                          i,
                        ) => (
                          <div className="checkout__orders-list" key={i}>
                            <p className="checkout__orders-id">
                              Order Id: #{order_id.slice(0, 5)}XXX
                            </p>
                            <div className="checkout__orders-item">
                              {img && (
                                <ImageRenderer
                                  alt={name}
                                  url={img + '_100x100q90.jpg'}
                                  divClass="checkout__image-wrapper"
                                  imgClass="checkout__image"
                                />
                              )}
                              <div className="checkout__orders-detail">
                                <h3 className="checkout__orders-detail-heaing">
                                  {title}
                                </h3>
                                <div className="checkout__orders-detail-types">
                                  <p className="checkout__orders-detail-text">
                                    By Air
                                  </p>
                                </div>
                              </div>
                            </div>
                            <CheckoutCostTable
                              name={name}
                              price={price}
                              totalBill={clientOrders?.prices}
                              qunatity={qunatity}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
                <div className="checkout__column-two">
                  <div className="checkout__column-two-wrapper">
                    <div className="checkout__order-summery">
                      <h3 className="checkout__order-summery-heading">
                        Fees & Summery
                      </h3>
                      <CheckoutTable
                        totalBill={clientOrders?.prices}
                        shippingDetails={
                          shippingDetails && shippingDetails?.shipping_details
                        }
                      />
                    </div>
                    {/* <div className="checkout__order-coupon">
                <h3 className="checkout__order-coupon-heading">Apply Coupon</h3>
                <form action="" className="checkout__order-coupon-form">
                  <label htmlFor="text" className="visually-hidden">
                    Address
                  </label>
                  <input
                    className="checkout__coupon-input"
                    id="text"
                    type="text"
                  />
                  <button className="checkout__coupon-button">Apply</button>
                </form>
              </div> */}
                    <div className="checkout__order-terms">
                      <label htmlFor="checkbox" className="visually-hidden">
                        checkbox
                      </label>
                      <input
                        type="checkbox"
                        defaultChecked="checked"
                        name="checkbox"
                        id="checkbox"
                      />
                      <p className="checkout__order-terms-text">
                        এই অর্ডারটি দেওয়ার মাধ্যমে আপনি আমাদের{' '}
                        <Link href="/returns-refund" target="_blank">
                          শর্তাবলী
                        </Link>{' '}
                        এবং{' '}
                        <Link href="/privacy-policy" target="_blank">
                          রিটার্ন ও রিফান্ড
                        </Link>{' '}
                        পলিসি গ্রহণ করছেন।
                      </p>
                    </div>
                    <button onClick={payNow} className="checkout__order-button">
                      Place Order & Pay ৳ {clientOrders?.prices.pay_now}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="products__card-empty-wrapper">
                <NoContent
                  height="475"
                  width="470"
                  src="/empty-list.png"
                  alt="empty-list"
                />
                <h3 className="products__heading products__heading--secondery">
                  Data Not Found
                </h3>
              </div>
            )}
          </>
        )}
      </section>
      {close && (
        <Alart
          heading={popUp?.heading}
          text={popUp?.text}
          close={() => setClose(false)}
        />
      )}
    </Layout>
  );
};
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session;
    return {
      props: {
        user: user,
      },
    };
  },
  ironOptions,
);
export default checkout;
