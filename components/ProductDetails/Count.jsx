import React from 'react';

const Count = React.memo(function Count({ number }) {
  let content = '';
  if (number > 0) {
    content = <span className="product-single__count">{number}</span>;
  }
  return content;
});

export default Count;
