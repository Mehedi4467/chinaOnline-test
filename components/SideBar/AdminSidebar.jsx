import React from 'react';
import Link from 'next/link';
import { SideBarIcon } from '../icons';

const AdminSidebar = ({ user, logoutUser }) => {
  const list = [
    { id: 1, name: 'Dashboard', url: '/dashboard' },
    // { id: 2, name: 'Orders', url: '/dashboard/orders' },
    // { id: 3, name: 'Balance', url: '/dashboard/balance' },
    // { id: 4, name: 'Delivery', url: '/dashboard/delivery' },
    // { id: 5, name: 'Support', url: '/dashboard/support' },
    // { id: 6, name: 'Agentship', url: '/dashboard/agentship' },
    { id: 7, name: 'Settings', url: '/dashboard/settings' },
  ];
  return (
    <div className="side-bar__wrapper scrollbar-hidden">
      <div className="side-bar__user">
        <div className="side-bar__user-icon">
          <p>U</p>
        </div>
        <h1 className="side-bar__user-name">
          {user && user?.name ? user?.name : user?.number}
        </h1>
        {/* <p className="side-bar__user-balance">
              Balance:{' '}
              <span className="side-bar__user-balance--amount">৳ 100</span>
            </p> */}
      </div>
      {list?.map(({ name, url, id }) => (
        <Link href={url} key={id} className="side-bar__item-wrapper">
          <p className="side-bar__item-name">{name}</p>
          <SideBarIcon className="side-bar__item-icon" />
        </Link>
      ))}
      <div className="side-bar__item-wrapper" onClick={logoutUser}>
        <p className="side-bar__item-name">Logout</p>
        <SideBarIcon className="side-bar__item-icon" />
      </div>
    </div>
  );
};

export default AdminSidebar;
