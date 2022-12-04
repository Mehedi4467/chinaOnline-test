import React, { useEffect, useMemo, useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Layout } from '../../layout';
import { dynamicSection } from '../../components/DynamicComponent';
import { NoContent, Pagination } from '../../components';
import { ProductList } from '../../components/Loader';
import { VendorsList } from '../../components/Products/ProductsFilter';
import { useQuery } from 'react-query';
const vendor = () => {
  const CardDynamic = dynamicSection.card;
  const router = useRouter();
  const { selectedId, setSelectedId } = useStateContext();
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
  const sort = router.query.sort_status;
  const direction = router.query.direction;
  const discountStatus = router.query.discount_status;
  const maxPrice = router.query.max_price;
  const minPrice = router.query.min_price;
  const [currentPage, setCurrentPage] = useState(
    Number(router.query.page) || 1,
  );
  useEffect(() => {
    if (key != '') {
      if (sort || direction || discountStatus) {
        if (
          sort &&
          sort != '' &&
          direction &&
          direction != '' &&
          !discountStatus
        ) {
          const url = `/api/product/vendorlist?key=${key}&sort=${sort}&direction=${direction}&page=${currentPage}`;
          setMainUrl(url);
        }
        if (sort && sort != '' && !direction && !discountStatus) {
          if (currentPage) {
            const url = `/api/product/vendorlist?key=${key}&sort=${sort}&page=${currentPage}`;
            setMainUrl(url);
          }
        }
        if (!sort && !direction && discountStatus) {
          const url = `/api/product/vendorlist?key=${key}&discount_status=${discountStatus}&page=${currentPage}`;
          setSelectedId(3);
          setMainUrl(url);
        }
      } else if (maxPrice || minPrice) {
        const url = `/api/product/vendorlist?key=${key}&max_price=${maxPrice}&min_price=${minPrice}&page=${currentPage}`;
        setMainUrl(url);
      } else {
        const url = `/api/product/vendorlist?key=${key}&page=${currentPage}`;
        setMainUrl(url);
      }
    } else {
      router.push('/404');
    }
  }, [key, sort, direction, maxPrice, minPrice, currentPage]);

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
    if (error.status != 200) {
      console.log('something wents wrong');
    }
  }
  useMemo(() => {
    setItems(data?.result);
    setPageCount(data?.maximum_page_count);
    setRate(data?.rate);
    setCount(data?.total_count);
  }, [data]);
  return (
    <Layout title="Seller Store" description="Seller Store Products List page">
      <section className="products">
        <VendorsList count={count} />
        {isLoading && isFetching ? (
          <ProductList />
        ) : (
          <>
            {items != '' && items?.length > 0 ? (
              <div className="products__card-wrapper">
                <CardDynamic data={items} rate={rate} />
              </div>
            ) : (
              <div className="products__card-empty-wrapper">
                <NoContent
                  height="435"
                  width="600"
                  src="/empty-busket.png"
                  alt="empty-busket"
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
                site="/vendor"
              />
            )}
          </>
        )}
      </section>
    </Layout>
  );
};
export default React.memo(vendor);
