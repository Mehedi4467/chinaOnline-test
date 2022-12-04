import React from 'react';
import Link from 'next/link';
import { NowYear } from '../Time';
import { EmailIcon, LocationIcon, PhoneIcon } from '../icons';
import Image from 'next/image';
const Footer = ({ siteConfig }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top-row">
          <div className="footer__first-col">
            <div className="footer__image-wrapper">
              <Image
                className="footer__image"
                src={siteConfig?.footer_address.footer_logo}
                alt={siteConfig?.footer_address.footer_title}
                width={1505 / 7}
                height={714 / 7}
              />
            </div>
            <div className="footer__details-wrapper">
              <div className="footer__details-top">
                <LocationIcon className="footer__details-icon" />
                <h3 className="footer__details-heading">Head Office:</h3>
              </div>
              <p className="footer__details-text">
                {siteConfig?.footer_address.head_office_address}
              </p>
            </div>
            <div className="footer__details-wrapper">
              <div className="footer__details-top">
                <LocationIcon className="footer__details-icon" />
                <h3 className="footer__details-heading">Registered Office:</h3>
              </div>
              <p className="footer__details-text">
                {siteConfig?.footer_address.reg_addresss}
              </p>
            </div>
            <div className="footer__details-wrapper">
              <div className="footer__details-top">
                <EmailIcon className="footer__details-icon" />
                <h3 className="footer__details-heading">Email:</h3>
              </div>
              <Link
                href={`mailto:${siteConfig?.footer_address.email}`}
                className="footer__details-text"
              >
                {siteConfig?.footer_address.email}
              </Link>
            </div>
            <div className="footer__details-wrapper">
              <div className="footer__details-top">
                <PhoneIcon className="footer__details-icon" />
                <h3 className="footer__details-heading">Phone:</h3>
              </div>
              <Link
                href={`tel:${siteConfig?.footer_address.phone}`}
                className="footer__details-text"
              >
                {siteConfig?.footer_address.phone}
              </Link>
            </div>
          </div>
          <div className="footer__second-col">
            <h3 className="footer__heading">Customer</h3>
            <div className="footer__link-wrapper">
              {siteConfig?.customer.map(({ link, name }, i) => (
                <Link href={`/${link}`} key={i} className="footer__link">
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer__third-col">
            <h3 className="footer__heading">Information</h3>
            <div className="footer__link-wrapper">
              {siteConfig?.information.map(({ link, name }, i) => (
                <Link href={`/${link}`} key={i} className="footer__link">
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer__fourth-col">
            <h3 className="footer__heading">Mobile Apps</h3>
            {siteConfig?.app_links.map(({ img, title, link }, i) => (
              <Link
                className="footer__apps-image-wrapper"
                key={i}
                href={`/${link}`}
              >
                <Image
                  className="footer__apps-image"
                  src={img}
                  alt={title}
                  width={889 / 7}
                  height={287 / 7}
                  quality={100}
                />
              </Link>
            ))}
            <h3 className="footer__heading">Social Links</h3>
            <div className="footer__social-links">
              {siteConfig?.social_media.map(({ img, link, title }, i) => (
                <Link href={`${link}`} key={i} className="footer__social-link">
                  <Image
                    className="footer__social-image"
                    src={img}
                    alt={title}
                    height={182 / 7}
                    width={182 / 7}
                    quality={100}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__associate-wrapper">
          {siteConfig?.associate_link.map(({ img, link, title }, i) => (
            <Link
              href={`${link}`}
              key={i}
              className="footer__associate"
              target="_blank"
            >
              <Image
                className="footer__associate-image"
                src={img}
                alt={title}
                fill
                sizes="(min-width: 768px) 80vw,
              (min-width: 1200px) 90vw"
              />
            </Link>
          ))}
        </div>
        <div className="footer__copyright">
          {siteConfig?.ot.link && (
            <Link
              href={`${siteConfig.ot.link}`}
              className="footer__copyright-link"
              title="Powered by OT Commerce"
              target="_blank"
            >
              <Image
                className="footer__copyright-image"
                src={siteConfig?.ot.logo}
                alt={siteConfig?.ot.title}
                height="42"
                width="58"
                sizes="(min-width: 768px) 80vw,
              (min-width: 1200px) 90vw"
              />
            </Link>
          )}
          <p className="footer__copyright-heading">CHINA ONLINE BD.</p>
          <NowYear className="footer__copyright-text" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
