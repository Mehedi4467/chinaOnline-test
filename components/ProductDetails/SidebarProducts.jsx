import React, { useEffect, useRef, useState } from 'react';
import { dynamicSection } from '../DynamicComponent';
import { useMediaQuery } from '../../hook';
import { ScrollIcon } from '../icons';
const SidebarProducts = ({ search, moreProduct, rate }) => {
  const isTab = useMediaQuery('(max-width: 1280px)');
  const CardDynamic = dynamicSection.card;
  const ref = useRef(null);
  const [autoScroll, setAutoScroll] = useState(false);
  useEffect(() => {
    if (autoScroll) {
      let timer1 = setInterval(() => {
        ref.current.scrollBy(0, 1);
      }, 5);
      return () => {
        clearInterval(timer1);
      };
    }
  }, [autoScroll]);
  return (
    <aside className="product-single__side-wrapper">
      {isTab && <h3 className="product-single__heading">More Products</h3>}
      <div className="product-single__side-cards scrollbar-hidden" ref={ref}>
        <CardDynamic search={search} data={moreProduct} rate={rate} />
      </div>

      {!isTab && (
        <div
          className="product-single__side-scroll-wrapper"
          onClick={() => setAutoScroll((prev) => !prev)}
        >
          <div className="product-single__side-scroll-main">
            <ScrollIcon className="product-single__side-scroll-icon" />
            <span className="product-single__side-scroll">Scroll</span>
          </div>
        </div>
      )}
    </aside>
  );
};
export default React.memo(SidebarProducts);
