import React from 'react';

const ProductDescription = ({ product }) => {
  return (
    <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
      <div className="mb-4 line-clamp-3">{product.description}</div>
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_1').showModal()}>
        더 보기
      </button>

      <dialog
        id="my_modal_1"
        className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="py-4">{product.description}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">확인</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDescription;
