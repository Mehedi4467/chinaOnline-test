import React from 'react';
import { NowDate } from '../Time';
import { ShoppingCartIcon } from '../icons';
const CartHeader = ({ heading, count, icon }) => {
  return (
    <div className="cart-header">
      <div className="cart-header__wrapper">
        {heading && <h1 className="cart-header__title">{heading}</h1>}
        {count && <div>{count ? count : 0}</div>}
        {icon && <ShoppingCartIcon className="cart-header__icon" />}
      </div>
      <NowDate className="cart-header__time" />
    </div>
  );
};
export default CartHeader;
