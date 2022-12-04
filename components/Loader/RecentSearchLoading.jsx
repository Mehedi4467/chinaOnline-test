import React from 'react';
import { demoProduct } from './../../data/demo';
const RecentSearchLoading = () => (
  <div className="loader__search">
    <div className="loader__heading"></div>
    <div className="loader__search-cart-wrapper">
      {demoProduct.slice(0, 13).map((itm, i) => (
        <div className="loader__cart" key={i}>
          <div className="cart__image-wrapper loader__image"></div>
          <div className="loader__heading loader__heading--primary"></div>
          <div className="loader__text"></div>
        </div>
      ))}
    </div>
  </div>
);
export default RecentSearchLoading;
