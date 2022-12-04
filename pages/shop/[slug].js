import React, { useEffect, useMemo, useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Layout } from '../../layout';
import { dynamicSection } from '../../components/DynamicComponent';
import { ProductList } from '../../components/Loader';
import { NoContent, Pagination } from '../../components';
import { ProductsList } from '../../components/Products/ProductsFilter';
import { useQuery } from 'react-query';
const shop = () => {
  const CardDynamic = dynamicSection.card;
  const router = useRouter();
  const { searchTitle, setSearchTitle, setSelectedId } = useStateContext();
  const [items, setItems] = useState();
  const [pageCount, setPageCount] = useState();
  const [rate, setRate] = useState();
  const [count, setCount] = useState();

  const searchData = async (url) => {
    // console.log(url);
    const { data } = await axios.get(url, {
      headers: {
        token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });
    return data;
  };
  const key = router.query.slug;
  const imageData = router.query.image_url;
  const sort = router.query.sort_status;
  const direction = router.query.direction;
  const discountStatus = router.query.discount_status;
  const maxPrice = router.query.max_price;
  const minPrice = router.query.min_price;
  const [currentPage] = useState(Number(router.query.page) || 1);
  useEffect(() => {
    if (key != 'imageSearch' && key != '') {
      setSearchTitle(key);
      if (sort || direction || discountStatus) {
        if (
          sort &&
          sort != '' &&
          direction &&
          direction != '' &&
          !discountStatus
        ) {
          const url = `/api/product/list?key=${key}&sort=${sort}&direction=${direction}&page=${currentPage}`;
          setMainUrl(url);
        }
        if (sort && sort != '' && !direction && !discountStatus) {
          if (currentPage) {
            const url = `/api/product/list?key=${key}&sort=${sort}&page=${currentPage}`;
            setMainUrl(url);
          } else {
            const url = `/api/product/list?key=${key}&sort=${sort}`;
            setMainUrl(url);
          }
        }
        if (!sort && !direction && discountStatus) {
          const url = `/api/product/list?key=${key}&discount_status=${discountStatus}&page=${currentPage}`;
          setSelectedId(3);
          setMainUrl(url);
        }
      } else if (maxPrice || minPrice) {
        const url = `/api/product/list?key=${key}&max_price=${maxPrice}&min_price=${minPrice}&page=${currentPage}`;
        setMainUrl(url);
        setSelectedId(0);
      } else {
        const url = `/api/product/list?key=${key}&page=${currentPage}`;
        setMainUrl(url);
        setSelectedId(0);
      }
    } else if (key === 'imageSearch' && key != '' && imageData) {
      setSearchTitle('');
      const url = `/api/product/image?key=${imageData}&page=${currentPage}`;
      setMainUrl(url);
    } else {
      setSearchTitle('');
      router.push('/404');
    }
  }, [key, imageData, sort, direction, maxPrice, minPrice, currentPage]);

  const [mainUrl, setMainUrl] = useState('');
  const { isLoading, isFetching, error, data } = useQuery(
    ['searchData', mainUrl],
    () => searchData(mainUrl),
    {
      enabled: Boolean(mainUrl),
    },
  );
  if (error) {
    console.log(error);
  }
  useMemo(() => {
    setItems(data?.result);
    setPageCount(data?.maximum_page_count);
    setRate(data?.rate);
    setCount(data?.total_count);
  }, [data]);
  return (
    <Layout title={searchTitle} description={`${searchTitle} List page`}>
      <section className="products">
        <ProductsList count={count} />
        {isLoading && isFetching ? (
          <ProductList />
        ) : (
          <>
            {items != '' ? (
              <div className="products__card-wrapper">
                <CardDynamic
                  data={items}
                  search={key != 'imageSearch' && key}
                  rate={rate}
                />
              </div>
            ) : (
              <div className="products__card-empty-wrapper">
                <NoContent
                  src="/empty-busket.png"
                  alt="empty-busket"
                  height="435"
                  width="600"
                />
                <h3 className="products__heading products__heading--secondery">
                  Product Not found
                </h3>
              </div>
            )}
            {pageCount > 1 && (
              <Pagination
                current={currentPage}
                total={pageCount}
                site="/shop"
              />
            )}
          </>
        )}
      </section>
    </Layout>
  );
};
export default React.memo(shop);
