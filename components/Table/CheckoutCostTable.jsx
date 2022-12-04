import React from 'react';
import { QuestionIcons } from '../icons';
const CheckoutCostTable = ({ name, price, qunatity, totalBill }) => {
  return (
    <div className="checkout__orders-costs">
      <table className="table">
        <tbody>
          <tr>
            <td>Varients : {name}</td>
            <td>
              {qunatity} x ৳ {price}
            </td>
            <td>৳ {qunatity * price}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{qunatity}</td>
            <td>৳ {qunatity * price}</td>
          </tr>
          <tr>
            <td>
              <div className="checkout__orders-charge">
                <QuestionIcons className="checkout__orders-costs-icon" />
                Approximate China Courier Charge
              </div>
            </td>
            <td colSpan={2}>TBA</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CheckoutCostTable;
