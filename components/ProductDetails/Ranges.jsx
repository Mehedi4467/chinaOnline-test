import React, { useEffect } from 'react';

const Ranges = function Ranges({
  data,
  final,
  activeRange,
  setActiveRange,
  setRangePrice,
  table,
  setTable,
  setFinalPrice,
  setFullTable,
  fullTable,
}) {
  const ranges = data.ranges;

  useEffect(() => {
    let quantity = 0;
    final.forEach((p, k) => {
      quantity = quantity + p.q;
    });
    if (ranges && ranges.length > 0) {
      ranges.map((p, k) => {
        if (quantity >= p.minimum_qty) {
          if (ranges[k + 1]) {
            if (quantity < ranges[k + 1].minimum_qty) {
              setActiveRange(k);
              setRangePrice(p.price);
              setFinalPrice(p.price * quantity);
            }
          } else {
            setActiveRange(k);
            setRangePrice(p.price);
            setFinalPrice(p.price * quantity);
          }
        }
      });
    }
  }, [final]);

  useEffect(() => {
    let price = ranges[activeRange].price;

    let newTable = [...table];

    newTable.map((p, k) => {
      p[1].price = price;
    });

    let newFullTable = [...fullTable];

    newFullTable.forEach((p, k) => {
      p[1].price = price;
    });
    setFullTable(newFullTable);
    setTable(newTable);
  }, [activeRange]);

  return (
    <>
      {data.ranges && data.ranges.length > 0 && (
        <div className="product-single__qty-range-wrapper">
          {data.ranges.map((p, k) => (
            <div
              className={
                activeRange === k
                  ? 'product-single__qty-range product-single__qty-range--active'
                  : 'product-single__qty-range'
              }
              key={p.minimum_qty}
            >
              <p className="product-single__qty-price">{p.price} Taka</p>
              <p className="product-single__qty">{p.minimum_qty} or more</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Ranges;
