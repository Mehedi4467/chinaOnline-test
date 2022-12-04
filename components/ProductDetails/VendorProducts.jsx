import React from 'react';
import { dynamicSection } from '../DynamicComponent';
import Link from 'next/link';
import { PlusIcon } from '../icons';
const VendorProducts = ({ vendorStore, rate, search, vendorCode }) => {
  const CardDynamic = dynamicSection.card;
  return (
    <div className="product-single__vendor-wrapper">
      <h2 className="product-single__heading">seller store</h2>
      <div className="product-single__vendor">
        <CardDynamic search={search} data={vendorStore} rate={rate} />
        <Link href={`/vendor/${vendorCode}`} className="search__cart">
          <div className="search__cart-main">
            <PlusIcon className="search__cart-icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default React.memo(VendorProducts);
