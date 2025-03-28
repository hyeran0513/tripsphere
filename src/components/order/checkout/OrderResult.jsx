import React from 'react';

const OrderResult = ({ accommodation, isOpen, toggleContent }) => {
  return (
    <div
      key={accommodation.accommodation_id}
      className="border-b border-base-300 mb-4">
      <button
        onClick={toggleContent}
        className="flex justify-between items-center w-full text-left p-4 bg-base-200 rounded-lg">
        <span className="text-base/7 font-semibold">{accommodation.name}</span>
        <span
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 text-base-content">
          <p>{accommodation.description}</p>
          <p className="text-sm">위치: {accommodation.location.place_name}</p>
          <p className="text-sm">가격: {accommodation.original_price} 원</p>
          <div className="flex items-center gap-2">
            {accommodation.images && accommodation.images.length > 0 && (
              <img
                src={accommodation.images[0]}
                alt={accommodation.name}
                className="w-32 h-32 object-cover"
              />
            )}
          </div>
          <p className="text-sm">재고: {accommodation.stock}</p>
        </div>
      )}
    </div>
  );
};

export default OrderResult;
