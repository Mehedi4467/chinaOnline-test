import React from 'react';
import { Announcement, TopCategory } from '../components';
import axios from 'axios';
import { Layout } from '../layout';
import { dynamicSection } from '../components/DynamicComponent';
const Home = ({ social, banner, video, topCategory, deals, offer }) => {
  const HeroDynamic = dynamicSection.Hero;
  const RecentSearchDynamic = dynamicSection.RecentSearch;
  const TopSearchDynamic = dynamicSection.TopSearch;
  const HotDealsDynamic = dynamicSection.HotDeals;
  const MostLoved = dynamicSection.MostLoved;
  return (
    <Layout>
      {offer?.status && <Announcement announcement={offer?.announcement} />}
      <HeroDynamic social={social} banner={banner} />
      <HotDealsDynamic deals={deals} video={video} />
      <TopCategory topCategory={topCategory} />
      <RecentSearchDynamic />
      <TopSearchDynamic />
      <MostLoved />
    </Layout>
  );
};
export const getStaticProps = async () => {
  const social = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/social/media/ad/panel`,
    {
      headers: {
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
      },
    },
  );
  const banner = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get/banner`,
    {
      headers: {
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
      },
    },
  );
  const video = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get/story`,
    {
      headers: {
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
      },
    },
  );
  const deals = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/deals/get/items`,
    {
      headers: {
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
      },
    },
  );

  const announcement = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get/announcement`,
    {
      headers: {
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
      },
    },
  );
  return {
    props: {
      social: social.data.data,
      banner: banner.data.data,
      video: video.data.data,
      deals: deals.data,
      offer: announcement.data,
      fallback: true,
    },
    revalidate: 600,
  };
};

export default Home;
