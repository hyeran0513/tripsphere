import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <RotatingLines
        visible
        height="56"
        width="56"
        strokeWidth="5"
        strokeColor="oklch(0.511 0.262 276.966)"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        className="text-white stroke-white"
      />
    </div>
  );
};

export default Loading;
