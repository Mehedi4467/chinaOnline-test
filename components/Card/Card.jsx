import React from 'react';
import Link from 'next/link';
import { ImageRenderer } from '..';
const Card = ({ data, search, title }) => {
  return (
    <>
      {data?.map(
        ({
          Id,
          Title,
          Pictures,
          Price,
          seller,
          PromotionPrice,
          PromotionPricePercent,
        }) => (
          <article className="card" key={Id} title={Title}>
            <Link
              href={`/product/${Id}${search ? `?search=${search}` : ''}`}
              className="card__main"
            >
              {title && <p className="card__top-sell">{title}</p>}
              <ImageRenderer
                divClass="card__image-wrapper"
                imgClass="card__image"
                url={Pictures}
                alt={Title}
              />
              <div className="card__contents">
                <h3 className="card__contents-heading">{Title}</h3>
                {PromotionPrice ? (
                  <div className="card__text-wrapper">
                    <div className="card__contents-wrappper">
                      <p className="card__contents-price card__contents-price--previous">
                        {Math.ceil(Price)} Taka
                      </p>
                      <p className="card__current-price">
                        {Math.ceil(PromotionPrice)}
                        Taka
                      </p>
                    </div>
                    <div className="card__contents-wrappper">
                      {PromotionPricePercent && (
                        <p className="card__contents-percent">
                          {PromotionPricePercent}% OFF
                        </p>
                      )}

                      <p className="card__contents-sold">
                        {seller?.sale.length > 7 ? (
                          <>
                            SOLD: {seller?.sale.slice(0, 7)}
                            {'...'}
                          </>
                        ) : (
                          <>SOLD: {seller?.sale ? seller?.sale : 0}</>
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="card__text-wrapper">
                    <p className="card__contents-price">
                      {Math.ceil(Price)} Taka
                    </p>
                    <p className="card__contents-sold">
                      {seller?.sale.length > 7 ? (
                        <>
                          SOLD: {seller?.sale.slice(0, 7)}
                          {'...'}
                        </>
                      ) : (
                        <>SOLD: {seller?.sale ? seller?.sale : 0}</>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </article>
        ),
      )}
    </>
  );
};
export default React.memo(Card);
