import React from 'react';
import { BiSolidGridAlt } from 'react-icons/bi';
import ImageGallery from './ImageGallery';

const ProductGallery = ({ product }) => {
  return (
    <div className="relative pt-6">
      {/* 모달 버튼 */}
      <button
        className="btn absolute bottom-5 right-5"
        onClick={() => document.getElementById('my_modal_4').showModal()}>
        <BiSolidGridAlt /> 사진 모두 보기
      </button>

      {/* 모달 영역 */}
      <dialog
        id="my_modal_4"
        className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <div className="py-4">
            <ImageGallery images={product.images} />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* 이미지 영역 (1개일 경우) */}
      {product.images.length === 1 && (
        <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl h-[500px] overflow-hidden rounded-l-lg rounded-r-lg">
          <img
            alt={product.name}
            src={product.images[0]}
            className="hidden size-full object-cover lg:block"
          />
        </div>
      )}

      {/* 이미지 영역 (2개일 경우) */}
      {product.images.length === 2 && (
        <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-2">
          <img
            alt={product.name}
            src={product.images[0]}
            className="hidden size-full rounded-l-lg object-cover lg:block h-[500px]"
          />
          <img
            alt={product.name}
            src={product.images[1]}
            className="hidden size-full rounded-r-lg object-cover lg:block h-[500px]"
          />
        </div>
      )}

      {/* 이미지 영역 (3개일 경우) */}
      {product.images.length === 3 && (
        <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-2">
          <img
            alt={product.name}
            src={product.images[0]}
            className="hidden size-full rounded-l-lg object-cover lg:block h-[500px]"
          />
          <img
            alt={product.name}
            src={product.images[1]}
            className="hidden size-full object-cover lg:block h-[500px]"
          />
          <img
            alt={product.name}
            src={product.images[2]}
            className="aspect-3/2 w-full rounded-r-lg object-cover h-[500px]"
          />
        </div>
      )}

      {/* 이미지 영역 (4개일 경우) */}
      {product.images.length >= 4 && (
        <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-2 h-[500px]">
          <img
            alt={product.name}
            src={product.images[0]}
            className="hidden size-full rounded-l-lg object-cover lg:block "
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-2">
            <img
              alt={product.name}
              src={product.images[1]}
              className="aspect-3/2 w-full object-cover"
            />
            <img
              alt={product.name}
              src={product.images[2]}
              className="aspect-3/2 w-full object-cover"
            />
          </div>
          <img
            alt={product.name}
            src={product.images[3]}
            className="aspect-4/5 size-full object-cover sm:rounded-r-lg lg:aspect-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
