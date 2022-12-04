import React from 'react';
import { demoProduct } from './../../data/demo';
const TopCategoryLoader = () => (
  <div className="loader__category">
    <div className="loader__heading"></div>
    <div className="loader__top-category-cards">
      <div className="loader__top-category-card-main">
        {demoProduct.map((itm, i) => (
          <div className="loader__top-category-card" key={i}></div>
        ))}
      </div>
    </div>
  </div>
);
export default TopCategoryLoader;
