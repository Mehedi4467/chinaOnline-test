import React from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, CrossIcons } from '../icons';
import { ImageRenderer } from '../';

const WishlistCard = ({ result, CloseCard }) => {
  return (
    <div className="wishlist">
      {result?.map(({ Id, Pictures, Price, Title }) => (
        <article key={Id} className="wishlist__card">
          <Link href={`/product/${Id}`} className="wishlist__card-first-row">
            <ImageRenderer
              alt={Title}
              url={Pictures}
              imgClass="wishlist__card-image"
              divClass="wishlist__card-image-wrapper"
            />
            <h2 className="wishlist__card-heaing">{Title}</h2>
          </Link>
          <div className="wishlist__card-second-row">
            <p className="wishlist__card-price">৳ {Price}</p>
            <Link href={`/product/${Id}`} className="wishlist__button-wrapper">
              <ShoppingCartIcon className="wishlist__button-icon" />
              <p className="wishlist__card-icon-text">View</p>
            </Link>
            <div
              className="wishlist__card-icon-wrappper"
              onClick={() => CloseCard(Id)}
            >
              <CrossIcons className="wishlist__card-icon" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default WishlistCard;
