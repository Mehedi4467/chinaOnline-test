import React from 'react';
import { Banner, SocialStory } from '..';
import { useMediaQuery } from '../../hook';

const Hero = ({ social, banner }) => {
  const isMobile = useMediaQuery('(max-width: 1280px)');
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <Banner banner={banner} />
        {!isMobile && <SocialStory social={social} />}
      </div>
    </section>
  );
};

export default React.memo(Hero);
