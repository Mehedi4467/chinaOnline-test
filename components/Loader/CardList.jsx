import React from 'react';
import { demoProduct } from './../../data/demo';
const CardList = () => (
  <>
    {demoProduct.map((itm, i) => (
      <div className="loader__cart" key={i}>
        <div className="cart__image-wrapper loader__image"></div>
        <div className="loader__heading loader__heading--primary"></div>
        <div className="loader__text"></div>
      </div>
    ))}
  </>
);
export default CardList;
