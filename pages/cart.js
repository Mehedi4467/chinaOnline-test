import React from 'react';
import { CartTable, CartCostTable, CartHeader } from '../components';
import { Layout } from '../layout';
import { useMediaQuery } from '../hook';

const cart = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  return (
    <Layout title="Cart" description="Cart Page">
      <CartHeader count={true} heading="Cart" />
      <div className="checkout__contents">
        <div className="checkout__column-one">
          <div className="checkout__orders">
            <div className="cart__orders-title">
              <label htmlFor="checkbox" className="visually-hidden">
                checkbox
              </label>
              <input
                type="checkbox"
                defaultChecked="checked"
                name="checkbox"
                id="checkbox"
              />
              <h2 className="cart__orders-heading">From China</h2>
              <button className="cart__remove-button">Remove All</button>
            </div>
            <div className="checkout__orders-list">
              <p className="checkout__orders-id">Order Id: #97461XXX</p>
              <div className="checkout__orders-item">
                <figure className="checkout__image-wrapper">
                  <img
                    className="checkout__image"
                    src="https://cbu01.alicdn.com/img/ibank/O1CN01zMuWaY1G9E0IUSpeo_!!2209005630579-0-cib.jpg"
                    alt=""
                  />
                </figure>
                <div className="checkout__orders-detail">
                  <h3 className="checkout__orders-detail-heaing">
                    Related Template-ABC9
                  </h3>
                  <div className="checkout__orders-detail-types">
                    <p className="checkout__orders-detail-text">By air</p>
                    <p className="checkout__orders-detail-text">12-24 days</p>
                  </div>
                </div>
              </div>
              <CartCostTable />
            </div>
            <div className="checkout__orders-list">
              <p className="checkout__orders-id">Order Id: #97461XXX</p>
              <div className="checkout__orders-item">
                <figure className="checkout__image-wrapper">
                  <img
                    className="checkout__image"
                    src="https://cbu01.alicdn.com/img/ibank/O1CN01zMuWaY1G9E0IUSpeo_!!2209005630579-0-cib.jpg"
                    alt=""
                  />
                </figure>
                <div className="checkout__orders-detail">
                  <h3 className="checkout__orders-detail-heaing">
                    Related Template-ABC9
                  </h3>
                  <div className="checkout__orders-detail-types">
                    <p className="checkout__orders-detail-text">By air</p>
                    <p className="checkout__orders-detail-text">12-24 days</p>
                  </div>
                </div>
              </div>
              <CartCostTable />
            </div>
          </div>
        </div>
        <div className="checkout__column-two">
          <div className="checkout__column-two-wrapper">
            <div className="checkout__order-summery">
              <CartTable />
            </div>
            {!isMobile && (
              <button className="checkout__order-button">Go to Checkout</button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default cart;
