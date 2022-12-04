import React, { useRef, useState } from 'react';
import { useIntersection } from '../../hook/IntersectionObserver';
import useSearch from '../../store/getSearch';
import { SearchContainer } from '../';
const RecentSearch = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef();
  useIntersection(sectionRef, () => {
    setIsInView(true);
  });
  const searchList = useSearch((state) => state.searchList);
  let uniqueSearch = [];
  uniqueSearch = [...new Set(searchList?.map((item) => item.value))];
  return (
    <section ref={sectionRef}>
      {isInView && uniqueSearch && uniqueSearch.length > 0 ? (
        <>
          {uniqueSearch.slice(0, 3).map((p, i) => (
            <div className="search" key={i}>
              {p.includes('-') || p.includes('http') ? (
                ''
              ) : (
                <SearchContainer name={p} />
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="search">
          <SearchContainer name="watch" />
        </div>
      )}
    </section>
  );
};

export default React.memo(RecentSearch);
