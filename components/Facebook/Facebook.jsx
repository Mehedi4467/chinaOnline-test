import React, { useEffect } from 'react';
import { init, cleanup } from './Script';
const Facebook = () => {
  useEffect(() => {
    console.log('Facebook');
    init();
    return () => {
      cleanup();
    };
  }, []);
  return (
    <>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </>
  );
};

export default Facebook;
