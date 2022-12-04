import React from 'react';
const CountDown = ({ timerComponents }) => {
  return (
    <div className="hot-deals__count-time" suppressHydrationWarning={false}>
      {timerComponents}
    </div>
  );
};

export default CountDown;
