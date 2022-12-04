import React from 'react';

const ContactForm = ({ massage, setMassage, handleSubmit }) => {
  return (
    <form className="form contact__second-col">
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            className="form__input"
            id="name"
            type="text"
            name="name"
            onChange={(e) => setMassage({ ...massage, name: e.target.value })}
            value={massage && massage?.name ? massage.name : ''}
            placeholder="Name"
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="number" className="form__label">
            Number
          </label>
          <input
            className="form__input"
            id="number"
            type="text"
            name="phone"
            onChange={(e) =>
              setMassage({
                ...massage,
                phone: e.target.value.replace(/\D/g, ''),
              })
            }
            value={massage && massage?.phone ? massage.phone : ''}
            placeholder="Number"
          />
        </div>
      </div>
      <div className="form__input-group">
        <label htmlFor="massage" className="form__label">
          Massage
        </label>
        <textarea
          className="form__input form__textarea"
          name="massage"
          id="massage"
          onChange={(e) => setMassage({ ...massage, message: e.target.value })}
          value={massage && massage?.message ? massage.message : ''}
          placeholder="Massage"
          cols="30"
          rows="8"
        ></textarea>
      </div>
      <button className="form__button" type="submit" onClick={handleSubmit}>
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
