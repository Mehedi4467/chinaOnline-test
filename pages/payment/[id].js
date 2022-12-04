import React from 'react';
import { Layout } from '../../layout';

const paymentSingle = () => {
  return (
    <Layout title="Payment Page" description="Payment Page">
      <section className="payment">
        <div className="payment__wrapper">
          <h1 className="payment__heading">Total Payable Amount : ৳ 28800</h1>
          <div className="payment__card-wrapper">
            <div className="payment__card">
              <label htmlFor="radio" className="visually-hidden">
                radio button
              </label>
              <input
                type="radio"
                className="payment__card-select"
                id="radio"
                name="radio"
              />
              <div className="payment__card-contents">
                <h2 className="payment__types">
                  Pay via Card, iBanking or Mobile banking
                </h2>
                <p className="payment__gateway-charge">
                  Payment Gateway Charge :{' '}
                  <span className="payment__charge-type">Free</span>
                </p>
                <div className="payment__image-wrapper">
                  <img
                    className="payment__image"
                    src="/sslcmrz.png"
                    alt="sslcmrz"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="payment__charge">
            Payment Processing charge :
            <span className="payment__charge-type">Free</span>
          </p>
          <p className="payment__total-cost">
            Final Amount: ৳ 28800 + ৳ 0 = ৳ 28800
          </p>
          <button className="payment__button">Continue Payment</button>
        </div>
      </section>
    </Layout>
  );
};

export default paymentSingle;
