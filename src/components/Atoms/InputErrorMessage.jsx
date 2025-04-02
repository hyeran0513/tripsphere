import React from 'react';

const InputErrorMessage = ({ error }) => {
  if (!error) return null;
  return <p className="mt-2 text-red-600 text-xs">{error}</p>;
};

export default InputErrorMessage;
