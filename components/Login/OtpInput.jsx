import React, { useState } from 'react';
const OtpInput = ({ showOtp }) => {
  const [otps, setOtps] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
  });
  const handleChange = (value, event) => {
    setOtps({ ...otps, [value]: event.target.value });
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      let main = otps.otp1 + otps.otp2 + otps.otp3 + otps.otp4;
      showOtp(main);
      if (next < 4) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };
  return (
    <div className="login__otp-wrapper">
      <input
        name="otp1"
        type="number"
        autoComplete="off"
        className="login__otp"
        value={otps.otp1}
        placeholder="*"
        onChange={(e) => handleChange('otp1', e)}
        tabIndex="1"
        maxLength="1"
        onKeyUp={inputfocus}
      />
      <input
        name="otp2"
        type="number"
        autoComplete="off"
        className="login__otp"
        value={otps.otp2}
        placeholder="*"
        onChange={(e) => handleChange('otp2', e)}
        tabIndex="2"
        maxLength="1"
        onKeyUp={inputfocus}
      />
      <input
        name="otp3"
        type="number"
        autoComplete="off"
        className="login__otp"
        value={otps.otp3}
        placeholder="*"
        onChange={(e) => handleChange('otp3', e)}
        tabIndex="3"
        maxLength="1"
        onKeyUp={inputfocus}
      />
      <input
        name="otp4"
        type="number"
        autoComplete="off"
        className="login__otp"
        value={otps.otp4}
        placeholder="*"
        onChange={(e) => handleChange('otp4', e)}
        tabIndex="4"
        maxLength="1"
        onKeyUp={inputfocus}
      />
    </div>
  );
};
export default OtpInput;
