import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersection } from '../../hook/IntersectionObserver';
import { WishlistIcon } from '../icons';
import { TrandingCard } from '../';
import { RecentSearchLoading } from '../Loader';

const MostLoved = () => {
  const [seachData, setSeachData] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef();
  useIntersection(sectionRef, () => {
    setIsInView(true);
  });
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);
  const getData = async () => {
    setLoading(true);
    try {
      const { status, data } = await axios.get(
        `/api/product/moreToLove?limit=${limit}`,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );
      if (status === 200) {
        setLoading(false);
        setLimit(data?.last_limit);
        setSeachData(data?.result);
      } else {
        setSeachData('');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.status != 200) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const loadMore = () => {
    getData();
  };

  return (
    <>
      <section ref={sectionRef}>
        {isInView && seachData && seachData.length > 0 && (
          <>
            <div className="popular-search">
              <WishlistIcon className="popular-search__icon" />
              <div className="popular-search__text">Tranding Products</div>
              <WishlistIcon className="popular-search__icon" />
            </div>
            <>
              {loading ? (
                <RecentSearchLoading />
              ) : seachData && seachData.length != 0 ? (
                <TrandingCard
                  data={seachData}
                  title="Tranding"
                  loadMore={() => loadMore()}
                />
              ) : (
                ''
              )}
            </>
          </>
        )}
      </section>
    </>
  );
};

export default React.memo(MostLoved);
