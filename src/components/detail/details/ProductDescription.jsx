import React from 'react';

const ProductDescription = ({ product }) => {
  return (
    <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
      {/* 숙소 설명 */}
      <div className="mb-4 line-clamp-3">{product.description}</div>

      {/* 더 보기 버튼 */}
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_1').showModal()}>
        더 보기
      </button>

      {/* 숙소 설명 모달 */}
      <dialog
        id="my_modal_1"
        className="modal">
        <div className="modal-box">
          {/* 숙소명 */}
          <h3 className="font-bold text-lg">{product.name}</h3>

          {/* 숙소 설명 */}
          <p className="py-4">{product.description}</p>

          {/* 버튼 영역 */}
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
