import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AccountTable } from '../../components';
import { Layout } from '../../layout';
import { DetailLine } from '../../components/Loader';
import { NoContent, CartHeader, Pagination } from '../../components';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../actions';
const account = ({ user }) => {
  const router = useRouter();
  const [pageCount, setPageCount] = useState(0);
  const searchData = async () => {
    const { id, number, token } = user;
    const userData = {
      id,
      number,
      token,
    };
    if (id && number && token) {
      const { data } = await axios.post(
        `/api/user/dashboard?page=${Number(router.query.page) || 1}`,
        userData,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );
      return data;
    }
  };
  const { isLoading, isFetching, error, data } = useQuery(
    ['searchData', user],
    () => searchData(user),
    {
      enabled: Boolean(user),
    },
  );
  useEffect(() => {
    if (user) {
      searchData();
    }
  }, [user]);
  useMemo(() => {
    // console.log(data);
    setPageCount(data?.total_page);
  }, [data]);
  const cancelOrder = async (orderId) => {
    const { id, number, token } = user;
    const userData = {
      id,
      number,
      token,
    };
    try {
      const { data, status } = await axios.post(
        `/api/user/closeorder?order_id=${orderId}`,
        userData,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );
      if (data && status === 200) {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const buyNow = async (orderId) => {
    const { id, number, token } = user;
    const userData = {
      id,
      number,
      token,
    };
    try {
      const { data, status } = await axios.post(
        `/api/user/buynow?order_id=${orderId}`,
        userData,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );
      if (data && status === 200) {
        router.push(`/checkout/${data?.payment_token}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Account" description="Account page">
      <section className="account">
        <CartHeader heading="Account" />
        {isLoading && isFetching ? (
          <div className="account__table-wrapper">
            <DetailLine />
          </div>
        ) : (
          <>
            {data && data?.result != undefined && data?.result.length > 0 ? (
              <div className="account__table-wrapper">
                <AccountTable
                  data={data?.result}
                  cancelOrder={cancelOrder}
                  buyNow={buyNow}
                />
              </div>
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
                current={Number(router.query.page) || 1}
                total={pageCount}
                site="/dashboard"
              />
            )}
          </>
        )}
      </section>
    </Layout>
  );
};
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session;
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return {
      props: {
        user: user,
      },
    };
  },
  ironOptions,
);
export default account;
