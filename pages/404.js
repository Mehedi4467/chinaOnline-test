import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../layout';
const Custom404 = () => (
  <Layout title="Error" description="Error page">
    <section className="error-page">
      <div className="error-page__wrapper">
        <Image
          className="error-page__image"
          src="/404.png"
          alt="404 image"
          width="550"
          height="180"
        />
        <Link className="visually-hidden" href="http://www.freepik.com">
          Designed by Freepik
        </Link>
        <h1 className="error-page__heading">404 Page Not Found</h1>
        <p className="error-page__subheading">
          Woops. Looks like this page doesn't exist
        </p>
        <Link href="/" className="error-page__link">
          Go to home
        </Link>
      </div>
    </section>
  </Layout>
);

export default Custom404;
