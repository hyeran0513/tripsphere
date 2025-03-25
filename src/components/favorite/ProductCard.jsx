import React from 'react';
import { BiCalendarAlt, BiTrash, BiHeart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { calculateDiscountedPrice } from '../../utils/discountedPrice';
import { formatNumber, formatDate } from '../../utils/format';
import TypeMapping from '../common/TypeMapping';

const ProductCard = ({ favorite, handleDelete }) => {
  return (
    <Link to="/product/0">
      <div className="flex flex-col items-start group card bg-base-100 transition-shadow gap-[20px]">
        <div className="h-full relative">
          <div className="h-[200px] rounded-md overflow-hidden">
            <img
              src={favorite.images[0]}
              alt={favorite.name}
              className="h-full object-cover"
            />
          </div>
        </div>

        <button
          className="btn btn-square btn-ghost indicator-item badge absolute top-2 right-2 transition opacity-0 hover:scale-110 group-hover:opacity-100 "
          onClick={handleDelete}>
          <BiTrash className="size-[1.2em]" />
        </button>

        <div className="card-body w-full py-0 px-0 gap-0">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <TypeMapping type={favorite.type} />

              <div className="badge badge-soft badge-info text-xs">
                {favorite.location.place_name}
              </div>
            </div>
          </div>

          <h2 className="mt-2 transition-colors card-title text-lg pb-3.5">
            <div className="line-clamp-1">{favorite.name}</div>
          </h2>

          <div className="flex flex-col border-b-1 border-gray-200 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="text-gray-400">{favorite.discount_rate}%</div>
              <div
                className="line-through text-gray-400"
                title="정가">
                {formatNumber(favorite.original_price)}원
              </div>
            </div>

            <div
              className="font-bold text-lg text-red-600"
              title="할인가">
              {formatNumber(
                calculateDiscountedPrice(
                  favorite.original_price,
                  favorite.discount,
                ),
              )}
              원
            </div>
          </div>

          <div
            className=""
            title="패키지 상세정보들">
            <div className="py-4 pr-4">
              <div className="">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <BiCalendarAlt className="text-base" />
                    <p className="font-bold">체크인</p>
                  </div>
                  <time dateTime={favorite.check_in}>
                    {formatDate(favorite.check_in)}
                  </time>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <BiCalendarAlt className="text-base" />
                    <p className="font-bold">체크아웃</p>
                  </div>
                  <time dateTime={favorite.check_out}>
                    {formatDate(favorite.check_out)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
