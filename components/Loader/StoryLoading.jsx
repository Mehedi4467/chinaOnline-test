import React from 'react';
import { demoProduct } from './../../data/demo';
const StoryLoading = () => (
  <div className="loader__story-cards">
    <div className="loader__story-cards-main">
      {demoProduct.map((itm, i) => (
        <div className="loader__story-card" key={i}></div>
      ))}
    </div>
  </div>
);
export default StoryLoading;
