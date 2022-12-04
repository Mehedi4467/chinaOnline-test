import React, { useState } from 'react';
import axios from 'axios';
import { Layout } from '../layout';
import Image from 'next/image';
import { EmailIcon, LocationIcon, PhoneIcon } from '../components/icons';
import { Alart, ContactForm } from '../components';

const contact = ({ siteConfig }) => {
  const [massage, setMassage] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [popUp, setPopUp] = useState({
    text: '',
    heading: '',
  });
  const [alart, setAlart] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await axios.post('/api/contact', massage, {
        headers: {
          token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      });
      if (status === 200 && data) {
        setAlart(true);
        setPopUp({
          heading: 'Information',
          text: data?.msg,
        });
        setMassage({
          name: '',
          phone: '',
          message: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Contact Us" description="Contact us Page">
      <section className="contact">
        <div className="contact__top-row">
          <div className="contact__first-col">
            <Image
              src="/mail-sent.png"
              alt="mail-sent"
              width={350}
              height={260}
              quality={100}
              className="contact__image"
            />
            <a className="visually-hidden" href="http://www.freepik.com">
              Designed by / Freepik
            </a>
            <h1 className="contact__heading">Contact Info:</h1>
            <div className="contact__details-wrapper">
              <LocationIcon className="contact__details-icon" />
              <p className="contact__details-text">
                {siteConfig?.footer_address.head_office_address}
              </p>
            </div>
            <div className="contact__details-wrapper">
              <EmailIcon className="contact__details-icon" />
              <a
                href={`mailto:${siteConfig?.footer_address.email}`}
                className="contact__details-text"
              >
                {siteConfig?.footer_address.email}
              </a>
            </div>
            <div className="contact__details-wrapper">
              <PhoneIcon className="contact__details-icon" />
              <a
                href={`tel:${siteConfig?.footer_address.phone}`}
                className="contact__details-text"
              >
                {siteConfig?.footer_address.phone}
              </a>
            </div>
          </div>
          <ContactForm
            massage={massage}
            setMassage={setMassage}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="contact__bottom-row">
          <h2 className="contact__heading contact__bottom-heading">
            Our Location
          </h2>
          <p className="contact__text">Find Us On Google Map</p>
          <iframe
            className="contact__map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.1713773307765!2d90.3897751!3d23.883540900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5a5298f0119%3A0x7b8e28fd7c90af51!2sChina%20Online%20BD!5e0!3m2!1sbn!2sbd!4v1665996571595!5m2!1sbn!2sbd"
            width="100%"
            height="480"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
        {alart && (
          <Alart
            heading={popUp?.heading}
            text={popUp?.text}
            close={() => setAlart(false)}
          />
        )}
      </section>
    </Layout>
  );
};

export default contact;
