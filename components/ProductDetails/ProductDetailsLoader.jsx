import React from 'react';
import { useMediaQuery } from '../../hook';
import {
  CardList,
  DetailLine,
  ProductSingleHeading,
  ProductSingleImage,
  ProductSmallImage,
  QuantityCard,
} from '../Loader';
import { demoProduct } from '../../data/demo';

const ProductDetailsLoader = () => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const isTab = useMediaQuery('(max-width: 1280px)');
  return (
    <section className="product-single">
      <div className="product-single__main">
        <div className="product-single__content-wrappper">
          <ProductSingleHeading />
          <div className="product-single__content">
            <div
              className="product-single__content-first-col"
              style={{ marginBottom: '15px' }}
            >
              <div className="product-single__content-images">
                <ProductSingleImage />
                <>
                  {isMobile ? (
                    <div className="loader__image-lists-wrapper">
                      {demoProduct.map((itm, i) => (
                        <div key={i}>
                          <ProductSmallImage className="product-single__image-lists" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="product-single__image-lists-wrapper">
                      {demoProduct.slice(0, 7).map((itm, i) => (
                        <div key={i}>
                          <ProductSmallImage className="product-single__image-lists" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </div>
            </div>
            <div className="product-single__content-second-col">
              <QuantityCard />
              <DetailLine />
            </div>
          </div>
        </div>
        {!isTab && (
          <div className="product-single__vendor-wrapper">
            <h2 className="product-single__heading">seller store</h2>
            <div className="product-single__vendor">
              <CardList />
            </div>
          </div>
        )}
      </div>

      {isTab ? (
        <>
          <aside className="product-single__side-wrapper">
            <h3 className="product-single__heading">More Products</h3>
            <div className="product-single__side-cards">
              <CardList />
            </div>
          </aside>
          <div className="product-single__vendor-wrapper">
            <h2 className="product-single__heading">seller store</h2>
            <div className="product-single__vendor">
              <CardList />
            </div>
          </div>
        </>
      ) : (
        <div className="product-single__side-wrapper">
          <div className="product-single__side-cards scrollbar-hidden">
            <CardList />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailsLoader;
