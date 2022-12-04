import React, { useState, useEffect } from 'react';
import { CardMinusIcon, CardPlusIcon, ShoppingCartIcon } from '../icons';
// import { getProductVariationPrice } from '../../../api/Products';

const TableRow = React.memo(function TableRow({
  p,
  sortedGroupArray,
  groups,
  final,
  setFinal,
  getVariationQuantity,
  // addons,
  table,
  setTable,
  index,
  price,
  id,
  product_code,
}) {
  let stock = p[1].stock;
  const [laterPrice, setLaterPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  let falseIndex = index;
  useEffect(() => {
    if (laterPrice !== null) {
      let mTable = [...table];
      let index = mTable.findIndex((el) => el[0] === p[0]);
      const object = mTable[index][1];
      object.price = laterPrice;
      setTable(mTable);
      setPriceLoading(false);
    }
    if (falseIndex === 0 && p[1].price === -1) {
      //   getVariationPrice(p[0]);
      setPriceLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, laterPrice]);

  let varQuan = getVariationQuantity(p[0]);
  const remove = () => {
    let array = [...final];
    let index = array.findIndex((el) => el.i === p[0]);
    if (index >= 0) {
      if (array[index].q === 1) {
        array.splice(index, 1);
      } else if (array[index].q > 1) {
        array[index].q = array[index].q - 1;
      }
    }
    setFinal(array);
  };

  const add = () => {
    let array = [...final];
    let index = array.findIndex((el) => el.i === p[0]);
    if (index >= 0) {
      if (array[index].q < stock) {
        array[index].q = array[index].q + 1;
      }
    } else {
      array.push({
        i: p[0],
        d: Object.values(p[1].variants),
        q: 1,
        a: [],
        img: p[1].main_image,
        p: p[1].price,
      });
    }
    setFinal(array);
  };
  const onChangeQuantity = (quantity) => {
    if (!quantity) {
      quantity = 0;
    }
    let new_quantity = parseInt(quantity);
    let array = [...final];
    let index = array.findIndex((el) => el.i === p[0]);

    if (new_quantity === 0) {
      array.slice(index, 1);
    }

    new_quantity = new_quantity <= stock ? new_quantity : stock;

    if (index >= 0) {
      array[index].q = new_quantity;
    } else {
      array.push({
        i: p[0],
        d: Object.values(p[1].variants),
        q: new_quantity,
        img: p[1].main_image,
        a: [],
        p: p[1].price,
      });
    }
    setFinal(array);
  };
  const getAvailAbility = (stock, price) => {
    if (price === 0 || stock === 0) {
      return <p className="product-single__table-quantity">Out of stock</p>;
    }
    if (price < 0) {
      return (
        <p className="product-single__table-quantity">Check Updated Price</p>
      );
    }
    if (stock > 0 && price > 0) {
      return <p className="product-single__table-quantity">{p[1].stock}</p>;
    } else if (stock < 0) {
      return <p className="product-single__table-quantity">Available</p>;
    }
  };

  const getPriceElement = (price, varId) => {
    if (price) {
      if (price > 0) {
        return '৳ ' + price;
      } else if (price === 0) {
        return 'Out Of Stock';
      }
    } else {
      return 'Out Of Stock';
    }
  };
  return (
    <>
      <tr key={index}>
        <td className="product-single__table-value">
          <span>{p[1].variants[sortedGroupArray[groups.length - 1][0]]}</span>
        </td>
        <td>
          <div>{getPriceElement(p[1].price, p[0])}</div>
        </td>
        <td>
          {varQuan > 0 ? (
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
                value={varQuan}
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
            <>
              {p[1].price <= 0 || p[1].stock === 0 ? (
                <div className="product-single__table-icon-wrapper">
                  <ShoppingCartIcon className="product-single__table-icon" />
                  <p className="product-single__table-icon-text">Add</p>
                </div>
              ) : (
                <div
                  onClick={() => add()}
                  className="product-single__table-icon-wrapper"
                >
                  <ShoppingCartIcon className="product-single__table-icon" />
                  <p className="product-single__table-icon-text">Add</p>
                </div>
              )}
            </>
          )}
          {getAvailAbility(p[1].stock, p[1].price)}
        </td>
      </tr>
    </>
  );
});

export default TableRow;
