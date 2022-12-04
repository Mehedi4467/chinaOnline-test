import React, { useEffect } from 'react';
import { CardMinusIcon, CardPlusIcon } from '../icons';
// import AddOns from './AddOns';

export default function SingleTableRow({ id, final, setFinal, price }) {
  useEffect(() => {
    setFinal([
      {
        i: id,
        d: null,
        q: 1,
        a: [],
        p: price,
      },
    ]);
  }, [id, setFinal, price]);

  const remove = () => {
    let array = [...final];
    if (array[0].q > 1) {
      array[0].q = array[0].q - 1;
    }

    setFinal(array);
  };
  const add = () => {
    let array = [...final];
    array[0].q = array[0].q + 1;
    setFinal(array);
  };
  const onChangeQuantity = (quantity) => {
    if (!quantity) {
      quantity = 0;
    }

    let new_quantity = parseInt(quantity);
    let array = [...final];
    let index = 0;

    if (new_quantity === 0) {
      array.slice(index, 1);
    }

    if (index >= 0) {
      array[index].q = new_quantity;
    }
    setFinal(array);
  };

  return (
    <tr key={1}>
      <td>
        <p>{'৳ ' + price}</p>
      </td>
      <td>
        {price > 0 ? (
          <div className="product-single__table-quantity-box card-add">
            <span
              className="product-single__table-quantity-plus"
              onClick={() => remove()}
            >
              <CardMinusIcon />
            </span>
            <input
              className="product-single__table-quantity-input"
              type="text"
              value={final[0] ? final[0].q : 1}
              onChange={(e) => onChangeQuantity(e.target.value)}
            />
            <span
              className="product-single__table-quantity-plus"
              onClick={() => add()}
            >
              <CardPlusIcon />
            </span>
          </div>
        ) : (
          <span>Out of Stock</span>
        )}
      </td>
    </tr>
  );
}
