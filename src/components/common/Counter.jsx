import React from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

const Counter = ({
  type,
  label,
  count,
  maxCount = Infinity,
  handlePeopleCount,
}) => {
  const increase = () => {
    if (count < maxCount) {
      handlePeopleCount(type, count + 1);
    }
  };

  const decrease = () => {
    if (count > 0) {
      handlePeopleCount(type, count - 1);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <p>{label}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn btn-circle"
          onClick={decrease}
          disabled={count === 0}
          aria-label={`${label} 감소`}>
          <BiMinus className="size-[1.2em]" />
        </button>

        <input
          type="number"
          value={count}
          className="input bg-base-200 w-20 text-center"
          readOnly
          aria-live="polite"
        />

        <button
          type="button"
          className="btn btn-circle"
          onClick={increase}
          disabled={count >= maxCount}
          aria-label={`${label} 증가`}>
          <BiPlus className="size-[1.2em]" />
        </button>
      </div>
    </div>
  );
};

export default Counter;
