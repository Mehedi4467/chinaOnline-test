import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Layout } from '../../layout';
import { UserForm, CartHeader } from '../../components';
import { DetailLine } from '../../components/Loader';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../actions';

const settings = ({ admin }) => {
  const [massage, setMassage] = useState({
    name: '',
    email: '',
    city: '',
    address: '',
    phone: '',
    emergnecy_number: '',
    district: '',
    delivery_method: '',
  });

  const [user, setUser] = useState({
    url: '',
    userToken: '',
    id: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(massage);
    const {
      name,
      phone,
      address,
      emergnecy_number,
      city,
      email,
      district,
      delivery_method,
    } = massage;

    let client = {};
    client.details = JSON.stringify({
      client_id: user?.id,
      access_token: user?.userToken,
      phone,
      name,
      emergnecy_number,
      email,
      city_upazila: city,
      district,
      address,
      delivery_method,
    });
    postData(client);
  };

  const postData = async (client) => {
    try {
      await axios.post(`/api/user/userdata`, client, {
        headers: {
          token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const searchData = async (url) => {
    const { data } = await axios.get(url, {
      headers: {
        token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    return data;
  };
  useEffect(() => {
    if (admin && admin != '') {
      const { id, token, number } = admin;
      setUser({
        url: `/api/user/settings?phone=${number}&client_id=${id}&token=${token}`,
        id: id,
        userToken: token,
      });
    }
  }, [admin]);
  const { isLoading, isFetching, error, data } = useQuery(
    ['searchData', user?.url],
    () => searchData(user?.url),
    {
      enabled: Boolean(user?.url),
    },
  );
  if (error) {
    console.log(error);
  }
  useMemo(() => {
    if (data) {
      // console.log(data);
      setMassage(data);
    }
  }, [data]);
  return (
    <Layout title="Settings" description="Settings Page">
      <section className="setting">
        <CartHeader heading="Settings" />
        {isLoading && isFetching ? (
          <div className="form">
            <DetailLine />
          </div>
        ) : (
          <UserForm
            handleSubmit={handleSubmit}
            massage={massage}
            setMassage={setMassage}
          />
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
        admin: user,
      },
    };
  },
  ironOptions,
);
export default settings;
