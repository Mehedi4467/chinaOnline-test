import Link from 'next/link';
import React from 'react';
import { dynamicSection } from '../DynamicComponent';
import { PlusIcon } from '../icons';

const SearchCard = ({ name, data, title }) => {
  const CardDynamic = dynamicSection.card;
  return (
    <div className="search__wrapper">
      {name && <h2 className="search__heading">{name}</h2>}
      <div className="search__cart-wrapper">
        <CardDynamic data={data} search={name} title={title ? title : ''} />
        {name && (
          <Link href={`/shop/${name}`} className="search__cart">
            <div className="search__cart-main">
              <PlusIcon className="search__cart-icon" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
