import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '../layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { DetailLine } from '../components/Loader';
import { useQuery } from 'react-query';
import { NoContent, Pagination, CartHeader, WishlistCard } from '../components';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../actions';
import usewishList from '../store/getWishlist';
const wishlist = ({ admin }) => {
  const [pageCount, setPageCount] = useState(0);
  const [totalwishList, seTotalwishList] = useState(0);
  const [accessData, setAccessData] = useState({
    url: '',
    token: '',
  });
  const addwishList = usewishList((state) => state.addwishList);
  const router = useRouter();
  const page = router.query.page || 1;
  const manageWishlist = async () => {
    const { id, number, token } = admin;
    if (id && number && token) {
      setAccessData({
        url: `/api/product/wishlist?id=${id}&number=${number}&page=${page}&accessToken=${token}`,
        token: token,
      });
    } else {
      router.push('/login');
    }
  };
  const searchData = async (accessData) => {
    // console.log(url);
    const { data } = await axios.get(accessData.url, {
      headers: {
        token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
        'Access-Token': accessData.token,
      },
    });
    return data;
  };
  const { isLoading, isFetching, error, data } = useQuery(
    ['searchData', accessData],
    () => searchData(accessData),
    {
      enabled: Boolean(accessData),
    },
  );
  useMemo(() => {
    if (admin) {
      manageWishlist();
    }
    if (data) {
      setPageCount(data?.total_page);
      addwishList(data?.total_prodcut);
      seTotalwishList(data?.total_prodcut);
    }
  }, [data, admin]);

  const CloseCard = async (product_id) => {
    const { id, number, token } = admin;
    if (id && number && token) {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard/get/delete/product/wishlist?phone=${number}&client_id=${id}&product_id=${product_id}`,
          {
            headers: {
              token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
              'Access-Token': accessData.token,
            },
          },
        );
        if (data) {
          router.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Layout title="Wishlist" description="Wishlist Page">
      <CartHeader
        count={totalwishList ? totalwishList : 0}
        heading="wish list"
      />
      {isLoading && isFetching ? (
        <div className="wishlist">
          <DetailLine />
        </div>
      ) : (
        <>
          {data && data.result != undefined && data?.result.length > 0 ? (
            <WishlistCard result={data.result} CloseCard={CloseCard} />
          ) : (
            <NoContent
              height="475"
              width="470"
              src="/empty-list.png"
              alt="empty-list"
            />
          )}
          {pageCount > 1 && (
            <Pagination
              current={Number(page)}
              total={pageCount}
              site="/wishlist"
            />
          )}
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    return {
      props: {
        admin: user,
      },
    };
  },
  ironOptions,
);

export default wishlist;
