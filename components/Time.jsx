import React from 'react';
import { month } from '../data/demo';

export const NowDate = ({ className }) => {
  let d = new Date();
  let numberMonth = d.getMonth().toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  const date = `${day}${' '}${month[numberMonth]}${' '}${year}`;
  return <p className={className}>{date}</p>;
};
export const NowYear = ({ className }) => {
  const since = 2022;
  let date = new Date().getFullYear();
  if (since === date) {
    date = 'Present';
  }
  return (
    <p className={className}>
      {since} - {date} All rights reserved
    </p>
  );
};
