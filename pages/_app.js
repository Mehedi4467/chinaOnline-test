import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from '../layout';
import { useMediaQuery } from '../hook';
import {
  ErrorBoundary,
  Header,
  Messenger,
  Footer,
  MobileNav,
  SideBar,
} from '../components';
import { PageLoader } from '../components/Loader';
import { StateContext } from '../context/StateContext';
import '../styles/scss/styles.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
const queryClient = new QueryClient();
function MyApp({
  Component,
  pageProps,
  category,
  subCategory,
  topCategory,
  siteConfig,
  shippingDetails,
}) {
  const isMobile = useMediaQuery('(max-width: 800px)');
  let msgs = [
    ' By Name',
    ' By Type',
    ' By Picture',
    ' Form 200 millons Products',
  ];
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };
    // const handleContextmenu = (e) => {
    //   e.preventDefault();
    // };
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('980313576020465');
        ReactPixel.pageView();
        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView();
        });
      });
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    // document.addEventListener('contextmenu', handleContextmenu);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      // document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, [router]);
  // console.log = function () {};
  return (
    <QueryClientProvider client={queryClient}>
      <StateContext>
        <Header msgs={msgs} siteConfig={siteConfig} />
        <main className="main">
          <SideBar category={category} mainSubCategory={subCategory} />
          <main className="main__body">
            <ErrorBoundary>
              <Layout>
                {pageLoading ? (
                  <PageLoader />
                ) : (
                  <Component
                    {...pageProps}
                    topCategory={topCategory}
                    siteConfig={siteConfig}
                    shippingDetails={shippingDetails}
                  />
                )}
              </Layout>
            </ErrorBoundary>
          </main>
          <Footer siteConfig={siteConfig} />
        </main>
        {isMobile && router.pathname != '/product/[id]' ? <MobileNav /> : ''}
      </StateContext>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async () => {
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get/all/categories`,
    {
      headers: {
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
      },
    },
  );
  const siteData = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/site/data`,
    {
      headers: {
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
      },
    },
  );
  return {
    category: category.data.categories,
    subCategory: category.data.sub_categories,
    topCategory: category.data.top_categories,
    siteConfig: siteData.data.site_config,
    shippingDetails: siteData.data.product_details_config,
    fallback: 'blocking',
    revalidate: 600,
  };
};
export default MyApp;
