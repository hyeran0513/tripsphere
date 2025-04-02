import React from 'react';

const Heading = ({ title }) => {
  return (
    <h3 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
      {title}
    </h3>
  );
};

export default Heading;
