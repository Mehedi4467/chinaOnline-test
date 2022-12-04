import React, { useEffect, useRef, useState } from 'react';
import { WishlistIcon } from '../icons';
import { useIntersection } from '../../hook/IntersectionObserver';
import useSearchProduct from '../../store/getSearch';
import { SearchContainer } from '../';

const TopSearch = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef();
  useIntersection(sectionRef, () => {
    setIsInView(true);
  });
  const searchList = useSearchProduct((state) => state.topSearch);
  const fatchTopSearch = useSearchProduct((state) => state.fatchTopSearch);

  useEffect(() => {
    fatchTopSearch();
  }, []);

  return (
    <>
      <section ref={sectionRef}>
        {isInView && searchList && searchList.length > 0 && (
          <>
            <div className="popular-search">
              <WishlistIcon className="popular-search__icon" />
              <div className="popular-search__text">Most Popular Search</div>
              <WishlistIcon className="popular-search__icon" />
            </div>
            {searchList.slice(0, 4).map((p, i) => {
              return (
                <div className="search" key={i}>
                  {p.includes('-') || p.includes('http') ? (
                    ''
                  ) : (
                    <SearchContainer title="Top Sell" name={p} />
                  )}
                </div>
              );
            })}
          </>
        )}
      </section>
    </>
  );
};

export default React.memo(TopSearch);
