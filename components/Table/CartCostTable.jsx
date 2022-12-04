import React from 'react';
import { QuestionIcons } from '../icons';
import { QuantityCard } from '../';
const CartCostTable = () => {
  return (
    <div className="checkout__orders-costs">
      <table className="table">
        <tbody>
          <tr>
            <td>Color:Shallow brown large</td>
            <td>
              <QuantityCard />
            </td>
            <td>৳ 136836</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>36</td>
            <td>৳ 136836</td>
          </tr>
          <tr>
            <td>
              <div className="checkout__orders-charge">
                <QuestionIcons className="checkout__orders-costs-icon" />
                Approximate China Courier Charge
              </div>
            </td>
            <td>36</td>
            <td>৳ 136836</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CartCostTable;
