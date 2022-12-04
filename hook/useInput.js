import { useState } from 'react';

export const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, reset, attributeObj];
};
export const useValue = (initValue) => {
  const [value, setValue] = useState(initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e) => setValue(e.target.value.replace(/\D/g, '')),
  };

  return [value, reset, attributeObj];
};
