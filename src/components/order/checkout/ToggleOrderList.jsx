import React, { useState, useEffect } from 'react';
import OrderResult from './OrderResult';

const ToggleOrderList = ({ data }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  useEffect(() => {
    setOpenIndexes(new Array(data.length).fill(true));
  }, [data]);

  const toggleContent = (index) => {
    const updatedIndexes = [...openIndexes];
    updatedIndexes[index] = !updatedIndexes[index];
    setOpenIndexes(updatedIndexes);
  };

  return (
    <div className="w-full">
      {data.map((accommodation, index) => (
        <OrderResult
          key={accommodation.accommodation_id}
          accommodation={accommodation}
          isOpen={openIndexes[index]}
          toggleContent={() => toggleContent(index)}
        />
      ))}
    </div>
  );
};

export default ToggleOrderList;
