import React, { useState, useEffect } from 'react';
import { BangladeshFlagIcon, ChinaFlagIcon } from '../icons';
import { charges } from '../../data/demo';

const TaxShippingTable = React.memo(function TaxShippingTable({
  data,
  final,
  shipping,
  setShipping,
  rangePrice,
  finalPrice,
  setShippingTable,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    let quan = 0;
    let price = 0;

    final.forEach((p, k) => {
      let thisPrice = rangePrice ? rangePrice : p.p;
      quan = quan + p.q;
      price = price + thisPrice * p.q;
    });
    setTotalPrice(Number(price));
    setTotalQuantity(quan);

    setShippingTable({
      product_quantity: quan,
      total_price: Number(price),
      weight: data?.Weight ? data?.Weight * quan : 1,
      pay_now: Math.round(Number(price) * 0.4),
      pay_on_delivery: Math.round(Number(price) * 0.6),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [final, finalPrice]);
  return (
    <div className="product-single__shipping">
      <div className="product-single__shipping-type-wrapper">
        <div
          className={
            shipping.method === 'air'
              ? 'product-single__shipping-type product-single__shipping-type--active'
              : 'product-single__shipping-type'
          }
          onClick={() => {
            setShipping({ ...shipping, method: charges[0].method });
          }}
        >
          <label htmlFor="air" className="visually-hidden"></label>
          <input
            className="product-single__shipping-type-input"
            type="radio"
            checked={shipping.method === 'air'}
            onChange={() => charges[0].method}
            id="air"
            name="air"
            value="air"
          />
          <p className="product-single__shipping-type-text">
            By Air (12-24 Days)
          </p>
        </div>
        {/* <div
          className={
            shipping.method === 'sea'
              ? 'product-single__shipping-type product-single__shipping-type--active'
              : 'product-single__shipping-type'
          }
          onClick={() => {
            setShipping({ ...shipping, method: charges[1].method });
          }}
        >
        <label htmlFor="sea" className='visually-hidden'></label>
          <input
            className="product-single__shipping-type-input"
            type="radio"
            id="sea"
            checked={shipping.method === 'sea'}
            onChange={() => charges[1].method}
            name="sea"
            value="sea"
          />
          <p className="product-single__shipping-type-text">
            By Sea (48-72 Days)
          </p>
        </div> */}
      </div>
      <div className="product-single__shipping-table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>
                From China{' '}
                <ChinaFlagIcon className="product-single__table-flag" />
              </th>
              <th>
                To Bangladesh{' '}
                <BangladeshFlagIcon className="product-single__table-flag" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>Product Quantity</p>
              </td>
              <td className="product-single__table-value">
                <span>{totalQuantity}</span>
              </td>
            </tr>
            <tr>
              <td>
                <p>Product Price </p>
              </td>
              <td className="product-single__table-value">
                <span>{' ৳ ' + totalPrice}</span>
              </td>
            </tr>
            <tr>
              <td>
                <p>Total Cost</p>
              </td>
              <td className="product-single__table-value">
                <span>
                  {' ৳ ' + totalPrice} + চায়না কুরিয়ার বিল+ চায়না থেকে বাংলাদেশ
                  শিপিং চার্জ
                </span>
              </td>
            </tr>

            <tr>
              <td>
                <p>Pay now (40%)</p>
              </td>
              <td className="product-single__table-value">
                <span>{' ৳ ' + Math.round(totalPrice * 0.4)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <p>Pay on Delivery</p>
              </td>
              <td className="product-single__table-value">
                <span>
                  {' ৳ ' + Math.round(totalPrice * 0.6)} + শিপিং এবং কুরিয়ার
                  চার্জ
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TaxShippingTable;
