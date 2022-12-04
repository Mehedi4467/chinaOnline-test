import React, { useState } from 'react';
import { DropDownIcon } from '../icons';

const CheckoutForm = ({
  districtName,
  methodName,
  userInput,
  setUserInput,
}) => {
  const [optionId, setOptionId] = useState(0);
  const [optionTwoId, setOptionTwoId] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [isOpenTwo, setOpenTwo] = useState(false);

  const handleItemClick = ({ id, name }) => {
    setOptionId(id);
    setUserInput({ ...userInput, district: name });
  };
  const handleItemTwoClick = ({ id, name }) => {
    setOptionTwoId(id);
    setUserInput({ ...userInput, delivery_method: name });
  };

  return (
    <form
      className="form checkout__form"
      onClick={() => {
        isOpen === true
          ? setOpen(false)
          : isOpenTwo === true && setOpenTwo(false);
      }}
    >
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <span> *</span>
          <input
            className="form__input"
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) =>
              setUserInput({ ...userInput, name: e.target.value })
            }
            value={userInput && userInput?.name ? userInput.name : ''}
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="number" className="form__label">
            Contact Number
          </label>
          <span> *</span>
          <input
            className="form__input"
            id="number"
            type="number"
            name="phone"
            placeholder={
              userInput && userInput?.phone ? userInput?.phone : '0132********'
            }
            disabled
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="number" className="form__label">
            Emergency Contact Number (optional)
          </label>
          <input
            className="form__input"
            id="number"
            type="number"
            onChange={(e) =>
              setUserInput({ ...userInput, emergnecy_number: e.target.value })
            }
            value={
              userInput && userInput?.emergnecy_number
                ? userInput.emergnecy_number
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
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
            value={userInput && userInput?.email ? userInput.email : ''}
            placeholder="E-mail"
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="text" className="form__label">
            Address
          </label>
          <span> *</span>
          <input
            className="form__input"
            id="text"
            name="address"
            type="text"
            onChange={(e) =>
              setUserInput({ ...userInput, address: e.target.value })
            }
            value={userInput && userInput?.address ? userInput.address : ''}
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
            onChange={(e) =>
              setUserInput({ ...userInput, city: e.target.value })
            }
            value={userInput && userInput?.city ? userInput.city : ''}
            placeholder="City / Upazila"
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="select" className="form__label">
            Delivery Method
          </label>
          <div className="form__select">
            <div
              className="dropdown__header"
              onClick={() => setOpenTwo(!isOpenTwo)}
            >
              <p className="dropdown__heading">
                {optionTwoId ? methodName[optionTwoId] : methodName[0]}
              </p>
              <DropDownIcon
                className={`dropdown__icon ${
                  isOpenTwo && 'dropdown__icon--open'
                }`}
              />
            </div>
            {isOpenTwo && (
              <div className="dropdown__body">
                {methodName?.map((item, i) => (
                  <p
                    className={`${
                      i == optionTwoId
                        ? 'dropdown__item dropdown__item--selected'
                        : 'dropdown__item'
                    }`}
                    onClick={() =>
                      handleItemTwoClick({
                        id: i,
                        name: item,
                      })
                    }
                    id={i}
                    key={i}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="form__input-group">
          <label htmlFor="select" className="form__label">
            District
          </label>
          <div className="form__select">
            <div className="dropdown__header" onClick={() => setOpen(!isOpen)}>
              <p className="dropdown__heading">
                {optionId ? districtName[optionId] : districtName[0]}
              </p>
              <DropDownIcon
                className={`dropdown__icon ${isOpen && 'dropdown__icon--open'}`}
              />
            </div>
            {isOpen && (
              <div className="dropdown__body">
                {districtName?.map((item, i) => (
                  <p
                    className={`${
                      i == optionId
                        ? 'dropdown__item dropdown__item--selected'
                        : 'dropdown__item'
                    }`}
                    onClick={() =>
                      handleItemClick({
                        id: i,
                        name: item,
                      })
                    }
                    id={i}
                    key={i}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
