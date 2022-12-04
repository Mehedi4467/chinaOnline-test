import React from 'react';
import { Layout } from '../layout';
const about = () => {
  return (
    <Layout title="About Us" description="About Us Page">
      <section className="about-us">
        <h1 className="about-us__heading">About Us</h1>
        <div className="about-us__wrapper">
          <p className="about-us__text">
            “Chinaonlinebd.com” is the largest wholesale marketplace in
            Bangladesh that brings the latest local and international goods to
            your doorstep at a wholesale rate. You can purchase here any product
            of Alibaba also at the wholesale rate In Bangladeshi currency. We
            offer a wide selection of products from renowned brands with a
            promise of a fast, safe, and easy online purchase experience.
            Chinaonlinebd.com offers Nationwide free shipping and returns! For
            your convenience, we have several payment options including
            credit/debit cards, mobile banking, internet banking, and cash on
            delivery.
          </p>
          <div className="about-us__main">
            <h2 className="about-us__subheading">WHY Chinaonlinebd.com?</h2>
            <ul className="about-us__list-wrapper">
              <li className="about-us__list">
                A convenient online purchase experience.
              </li>
              <li className="about-us__list">
                The best retail prices and a vast variety of goods.
              </li>
              <li className="about-us__list">
                Most of our products have unique designs.
              </li>
              <li className="about-us__list">
                12 Hours, Super Friendly Customer Service via Phone, Live Chat
                and Facebook.
              </li>
              <li className="about-us__list">
                1500+ Positive reviews on Facebook and our website.
              </li>
              <li className="about-us__list">
                Multiple ways to make payment including Debit/Credit Card/Bank
                Transfer/Mobile Banking/Internet Banking & Paypal.
              </li>
              <li className="about-us__list">
                Payments in local currencies are accepted through Debit/Credit
                Card/Bank Transfer/Mobile Banking/Internet Banking & Paypal.
              </li>
              <li className="about-us__list">
                Cheapest international charge compared to most other
                international & national logistic companies.
              </li>
              <li className="about-us__list">
                Guaranteed compensation for your purchases that are lost or
                damaged during our shipping service.
              </li>
            </ul>
          </div>
          <p className="about-us__text">
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us.
          </p>
        </div>
      </section>
    </Layout>
  );
};
export default React.memo(about);
