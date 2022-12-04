import React, { useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useValue } from '../../hook/useInput';
import { OtpInput } from '..';
import { useRouter } from 'next/router';

const LoginCard = ({ setAuth }) => {
  const [otp, showOtp] = useState(0);
  const [validate, setValidate] = useState(false);
  const numberRef = useRef();
  const router = useRouter();
  const [number, resetNumber, userNumber] = useValue('');
  const backInput = () => {
    setValidate(false);
  };
  const paramiter = {
    phone: number,
    otp: otp,
  };
  const getUser = async (e) => {
    e.preventDefault();
    if (number.length === 11) {
      setValidate(true);
      try {
        const { data, status } = await axios.post('/api/auth/login', paramiter);
        if (status === 200 && data) {
          setAuth(false);
          router.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getOtp = async (e) => {
    e.preventDefault();
    if (number.length === 11) {
      setValidate(true);
      try {
        const { data, status } = await axios.post('/api/auth/otp', paramiter);
        if (status === 200 && data) {
          setValidate(true);
        }
      } catch (error) {
        if (error.response.status != 200) {
          console.log(error.response.status);
        }
      }
    }
  };
  return (
    <div className="login__wrapper">
      <div className="login__image-wrapper">
        <Image
          className="login__image"
          src="/login.webp"
          alt="login avator"
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        />
        <a className="visually-hidden" href="http://www.freepik.com">
          Designed by vectorjuice / Freepik
        </a>
      </div>
      <form className="login__form" method="POST">
        {validate ? (
          ''
        ) : (
          <div className="login__input-wrapper">
            <label htmlFor="number" className="visually-hidden">
              Phone Number
            </label>
            <input
              className="login__input"
              placeholder="Enter Phone Number"
              type="number"
              id="number"
              name="number"
              ref={numberRef}
              {...userNumber}
              required
            />
          </div>
        )}
        {validate && (
          <div className="login__input-wrapper">
            <label htmlFor="number" className="visually-hidden">
              OTP
            </label>
            <OtpInput showOtp={showOtp} />
          </div>
        )}
        {validate ? (
          <div className="login__button-content">
            <button className="login__button" type="submit" onClick={getUser}>
              Verify Otp
            </button>
            <div className="login__button-wrapper">
              <button
                onClick={backInput}
                type="submit"
                className="login__button"
              >
                Reset Input
              </button>
              <button onClick={getUser} type="submit" className="login__button">
                Resent Otp
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={getOtp}
            type="submit"
            className={
              validate ? 'login__button' : `login__button login__button--first`
            }
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginCard;
