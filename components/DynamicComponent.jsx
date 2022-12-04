import dynamic from 'next/dynamic';
export const dynamicSection = {
  card: dynamic(() => import('./Card/Card')),
  Hero: dynamic(() => import('./Home/Hero')),
  RecentSearch: dynamic(() => import('./Home/RecentSearch')),
  TopSearch: dynamic(() => import('./Home/TopSearch')),
  CountDown: dynamic(() => import('../components/CountDown')),
  HotDeals: dynamic(() => import('./Home/HotDeals')),
  Story: dynamic(() => import('./Home/Story')),
  ProductDetails: dynamic(() => import('./ProductDetails/ProductDetails')),
  MostLoved: dynamic(() => import('./Home/MostLoved')),
};
