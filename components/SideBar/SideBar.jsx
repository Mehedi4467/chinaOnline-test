import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Category from './Category';
import AdminSidebar from './AdminSidebar';
import { useStateContext } from '../../context/StateContext';
import { useMediaQuery } from '../../hook';
import usewishList from '../../store/getWishlist';
const SideBar = ({ category, mainSubCategory }) => {
  const { showSideBar, setShowSideBar } = useStateContext();
  const deleteWishList = usewishList((state) => state.deleteWishList);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const router = useRouter();
  const [user, setUser] = useState('');
  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/user', {
        headers: {
          token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      });
      if (data) {
        setUser(data);
      }
    } catch (error) {
      if (error.status != 200) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, [router]);
  const logoutUser = async () => {
    if (user) {
      try {
        const { status } = await axios.post('/api/auth/logout', user);
        if (status === 200) {
          router.push(`/login`);
          deleteWishList();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  let sitebar = !showSideBar && 'none';
  return (
    <aside className="side-bar" style={{ display: sitebar }}>
      {isMobile && (
        <div
          className="side-bar__bg"
          onClick={() => {
            setShowSideBar(false);
          }}
        ></div>
      )}
      {router.pathname != '/dashboard' &&
      router.pathname != '/dashboard/settings' ? (
        <Category category={category} mainSubCategory={mainSubCategory} />
      ) : (
        <AdminSidebar user={user} logoutUser={logoutUser} />
      )}
    </aside>
  );
};

export default SideBar;
