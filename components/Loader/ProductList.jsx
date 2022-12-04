import React from 'react';
import { demoProduct } from './../../data/demo';
const ProductList = () => (
  <section className="products">
    <div className="products__card-wrapper">
      {demoProduct.map((itm, i) => (
        <div className="loader__cart" key={i}>
          <div className="cart__image-wrapper loader__image"></div>
          <div className="loader__heading loader__heading--primary"></div>
          <div className="loader__text"></div>
        </div>
      ))}
    </div>
  </section>
);
export default ProductList;
