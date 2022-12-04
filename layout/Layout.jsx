import React from 'react';
import Head from 'next/head';
const Layout = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {title
            ? `${title} - Chinaonlinebd`
            : 'Chinaonlinebd | Your Trusted Wholesale Partner - Chinaonlinebd'}
        </title>
        {description ? (
          <meta content={`Your Trusted Wholesale Partner ${description}`} />
        ) : (
          <meta name="description" content="Your Trusted Wholesale Partner" />
        )}
        <meta
          property="og:title"
          content="Chinaonlinebd | Your Trusted Wholesale Partner"
        />
        <meta
          property="og:description"
          content="Your Trusted Wholesale Partner"
        />
        <meta property="og:type" content="website" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="robots" content="index, follow" />
      </Head>
      {children}
    </>
  );
};
export default Layout;
