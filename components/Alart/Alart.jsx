import React from 'react';
const Alart = ({ heading, text, close }) => {
  return (
    <section className="alart">
      <div className="alart__wrapper">
        <div className="alart__content">
          <p className="alart__subheading">{heading}</p>
          <h3 className="alart__heading">{text}</h3>
          <button className="alart__button" type="submit" onClick={close}>
            close
          </button>
        </div>
      </div>
    </section>
  );
};

export default Alart;
