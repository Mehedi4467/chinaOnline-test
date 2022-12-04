import React from 'react';
const CheckoutTable = ({ totalBill, shippingDetails }) => {
  // console.log(totalBill);
  return (
    <table className="table">
      <tbody>
        <tr>
          <td>Shipping Charge</td>
          <td>
            ৳ {shippingDetails?.cost_primary} /{' '}
            {shippingDetails?.cost_secondary} per Kg
          </td>
        </tr>
        <tr>
          <td>Total Product Price</td>
          <td>৳ {totalBill?.total_bill}</td>
        </tr>
        {/* <tr>
            <td>Payment Gateway Charge (2.5%)</td>
            <td>৳ 3474</td>
          </tr> */}
        {/* <tr>
            <td>Final Product Price</td>
            <td>৳ 138972</td>
          </tr> */}
        <tr>
          <td>Pay Now (40%)</td>
          <td>৳ {totalBill?.pay_now}</td>
        </tr>
        <tr>
          <td>Pay on Delivery</td>
          <td>
            ৳ {parseFloat(totalBill?.total_bill - totalBill?.pay_now)} +
            Shipping & Courier Charges
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default CheckoutTable;
