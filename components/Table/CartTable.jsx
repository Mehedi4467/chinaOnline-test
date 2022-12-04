import React from 'react';
const CartTable = () => {
  return (
    <>
      <h3 className="checkout__order-summery-heading">Fees</h3>
      <table className="table">
        <tbody>
          <tr>
            <td>Shipping Charge</td>
            <td>৳ 660 / 760 per Kg</td>
          </tr>
        </tbody>
      </table>
      <h3 className="checkout__order-summery-heading">Summary</h3>
      <table className="table">
        <tbody>
          <tr>
            <td>From China</td>
            <td>৳ 1575</td>
          </tr>
          <tr>
            <td>Total Price</td>
            <td>৳ 1575</td>
          </tr>
          <tr>
            <td>Pay Now (80%)</td>
            <td>৳ 1260</td>
          </tr>
          <tr>
            <td>Pay on Delivery</td>
            <td>৳ 315 + Shipping & Courier Charges</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default CartTable;
