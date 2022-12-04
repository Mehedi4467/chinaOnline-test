import React from 'react';
import { dynamicSection } from '../DynamicComponent';

const TrandingCard = ({ loadMore, data, title }) => {
  const CardDynamic = dynamicSection.card;
  return (
    <div className="search__wrapper">
      <div className="search__cart-wrapper">
        <CardDynamic data={data} title={title ? title : ''} />
      </div>
      <button className="search__load-button" onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default TrandingCard;
