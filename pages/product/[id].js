import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Layout } from '../../layout';
import { useMediaQuery } from '../../hook';
import {
  VendorProducts,
  SidebarProducts,
  ProductDetailsLoader,
  ProductSpecification,
} from '../../components/ProductDetails';
import { dynamicSection } from '../../components/DynamicComponent';
import { NoContent } from '../../components';
import { ironOptions } from '../../actions';
import { withIronSessionSsr } from 'iron-session/next';
function productSingle({ user, shippingDetails }) {
  const isTab = useMediaQuery('(max-width: 1280px)');
  const ProductDetails = dynamicSection.ProductDetails;
  const router = useRouter();
  const [moreProduct, setMoreProduct] = useState();
  const [vendorStore, setVendorStore] = useState();
  const [details, setDetails] = useState();
  const [rate, setRate] = useState();
  const productId = router.query.id;
  const search = router.query.search;
  const searchData = async (url) => {
    const { data } = await axios.get(url, {
      headers: {
        token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });
    return data;
  };
  const [mainUrl, setMainUrl] = useState('');
  useMemo(() => {
    if (productId != undefined && productId != '') {
      const url = `/api/product/details?productId=${productId}&search=${
        search ? search : ''
      }`;
      setMainUrl(url);
    } else {
      router.push('/404');
    }
  }, [productId]);

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
    if (data) {
      setRate(data?.rate);
      setMoreProduct(data.associate_product_list);
      setVendorStore(data.vendor_store);
      setDetails(data?.product_details[0]);
    }
  }, [data]);
  return (
    <Layout title={details?.title} description={`${details?.title} page`}>
      {isLoading ? (
        <ProductDetailsLoader />
      ) : (
        <section className="product-single">
          <div className="product-single__main">
            {details && details != '' ? (
              <div className="product-single__content-wrappper">
                <h1 className="product-single__heading">{details?.title}</h1>
                <ProductDetails
                  admin={user}
                  data={details}
                  shippingDetails={shippingDetails}
                />
              </div>
            ) : (
              <NoContent
                height="435"
                width="600"
                src="/empty-busket.png"
                alt="empty-busket"
              />
            )}
            {!isTab && (
              <>
                <VendorProducts
                  isLoading={isLoading}
                  isFetching={isFetching}
                  vendorStore={vendorStore}
                  rate={rate}
                  search={search}
                  vendorCode={details?.vendor_id}
                />
                <ProductSpecification productId={productId} />
              </>
            )}
          </div>
          {isTab ? (
            <>
              <VendorProducts
                vendorStore={vendorStore}
                search={search}
                vendorCode={details?.vendor_id}
              />
              <ProductSpecification productId={productId} />
              <SidebarProducts
                search={search}
                moreProduct={moreProduct}
                rate={rate}
              />
            </>
          ) : (
            <SidebarProducts
              search={search}
              moreProduct={moreProduct}
              rate={rate}
            />
          )}
        </section>
      )}
    </Layout>
  );
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user || false;
    return {
      props: {
        user: user,
      },
    };
  },
  ironOptions,
);

export default productSingle;
