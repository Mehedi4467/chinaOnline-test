import React from 'react';
import { demoProduct } from './../../data/demo';
const DetailLine = () => (
  <>
    {demoProduct.slice(0, 10).map((itm, i) => (
      <div className="loader__line" key={i}></div>
    ))}
  </>
);
export default DetailLine;
