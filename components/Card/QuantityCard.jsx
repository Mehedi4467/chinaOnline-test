import React from 'react';
import { CardMinusIcon, CardPlusIcon } from '../icons';

const QuantityCard = () => {
  return (
    <div className="product-single__table-quantity-box">
      <span className="product-single__table-quantity-plus">
        <CardMinusIcon />
      </span>
      <input className="product-single__table-quantity-input" type="number" />
      <span className="product-single__table-quantity-minus">
        <CardPlusIcon />
      </span>
    </div>
  );
};
export default QuantityCard;
