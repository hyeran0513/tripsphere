import React, { useId } from 'react';

const Rating = ({ rating = 0, readOnly = false, setRating }) => {
  const id = useId();

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((num) => (
        <input
          key={num}
          type="radio"
          name={`rating-${id}`}
          className="mask mask-star-2 bg-orange-400"
          aria-label={`${num} star`}
          checked={readOnly ? num <= rating : rating === num}
          disabled={readOnly}
          onChange={() => setRating && setRating(num)}
        />
      ))}
    </div>
  );
};

export default Rating;
