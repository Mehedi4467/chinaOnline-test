import React from 'react';

const UserForm = ({ handleSubmit, massage, setMassage }) => {
  return (
    <form className="form">
      <div className="form__row setting__form-row">
        <div className="form__input-group">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            className="form__input"
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => setMassage({ ...massage, name: e.target.value })}
            value={massage && massage?.name ? massage.name : ''}
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="number" className="form__label">
            Contact Number
          </label>
          <input
            className="form__input"
            id="number"
            type="number"
            name="phone"
            placeholder={
              massage && massage?.phone ? massage?.phone : '0132********'
            }
            disabled
          />
        </div>
      </div>
      <div className="form__row setting__form-row">
        <div className="form__input-group">
          <label htmlFor="number" className="form__label">
            Emergency Contact Number (optional)
          </label>
          <input
            className="form__input"
            id="number"
            type="number"
            onChange={(e) =>
              setMassage({ ...massage, emergnecy_number: e.target.value })
            }
            value={
              massage && massage?.emergnecy_number
                ? massage.emergnecy_number
                : ''
            }
            placeholder="Emergency Contact Number"
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            className="form__input"
            id="email"
            name="email"
            type="email"
            onChange={(e) => setMassage({ ...massage, email: e.target.value })}
            value={massage && massage?.email ? massage.email : ''}
            placeholder="E-mail"
          />
        </div>
      </div>
      <div className="form__row setting__form-row">
        <div className="form__input-group">
          <label htmlFor="text" className="form__label">
            Address
          </label>
          <input
            className="form__input"
            id="text"
            name="address"
            type="text"
            onChange={(e) =>
              setMassage({ ...massage, address: e.target.value })
            }
            value={massage && massage?.address ? massage.address : ''}
            placeholder="Address"
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="name" className="form__label">
            City / Upazila
          </label>
          <input
            className="form__input"
            id="name"
            name="city"
            type="text"
            onChange={(e) => setMassage({ ...massage, city: e.target.value })}
            value={massage && massage?.city ? massage.city : ''}
            placeholder="City / Upazila"
          />
        </div>
      </div>
      <button
        className="form__button setting__form-button"
        type="submit"
        onClick={handleSubmit}
      >
        Update
      </button>
    </form>
  );
};

export default UserForm;
