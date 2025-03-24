import React from 'react';
import { BiCalendarAlt, BiHeart } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatDate, formatNumber } from '../../utils/format';
import KakaoShareButton from '../common/KakaoShareButton';

const ProductCard = ({ index, product, arrayLength, ref = null }) => {
  function bulidingType({ product }) {
    let message;

    switch (product.type) {
      case 'hotel':
        message = '호텔';
        break;
      case 'motel':
        message = '모텔';
        break;
      case 'resort':
        message = '리조트';
        break;
      case 'pension':
        message = '펜션';
        break;
      case 'guesthouse':
        message = '게스트하우스';
        break;
      case 'camping':
        message = '캠핑';
        break;
      default:
        message = '';
        break;
    }

    return message;
  }

  return (
    <li
    // ref={focus ? focus : ''}
    >
      <Link
        to={`/product/${product.id}`}
        autoFocus={index === 1 ? true : false}
        aria-label={`숙소 ${product.name} 상세 정보 페이지로 이동`}
        className={`group card bg-base-100 transition-shadow grid grid-cols-[2fr_5fr] gap-[20px] 
          ${index === 0 ? 'pb-[30px]' : 'py-[30px]'} 
          ${index !== arrayLength - 1 ? 'border-b border-gray-200' : ''}`}>
        <figure>
          <div className="h-full relative">
            <div className="h-[200px] rounded-md overflow-hidden">
              <img
                src={product.images[0]}
                alt="" // {product.name} 숙소 이미지를 보여주는 단순한 꾸미는 용도라 필요 없을 것 같음
                className="h-full object-cover"
                aria-label=""
              />
            </div>
          </div>
        </figure>

        <div className="card-body py-0 px-0 gap-0">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div
                className="badge badge-soft badge-primary"
                aria-label={`숙소 형태 ${bulidingType({ product })}`}>
                {bulidingType({ product })}
              </div>

              <div
                className="badge badge-soft badge-info"
                aria-label={`숙소 위치 ${product.rating}`}>
                {product.location.city} {product.location.sub_city}
              </div>
            </div>

            <div className="flex gap-2">
              <span
                className="hidden sm:block"
                aria-label="카카오톡으로 숙소 정보 공유하기">
                <KakaoShareButton
                  title={product.name}
                  description={product.description}
                  imageUrl={product.images[0]}
                  pageUrl={window.location.origin + '/product/0'}
                />
              </span>

              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                  aria-label="이 숙소를 찜목록에 추가하기">
                  <BiHeart
                    aria-hidden="true"
                    className="size-5 text-gray-400"
                  />
                </button>
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <h2
              className=" transition-colors card-title text-2xl pb-3.5 border-b-1 border-gray-200"
              aria-label={`숙소 이름 ${product.name}`}>
              {product.name}
            </h2>
            <div className="flex justify-center items-center">
              <span
                aria-label=""
                className="text-yellow-200 text-2xl">
                <FaStar />
              </span>
              <p
                aria-label={`숙소 평점 ${product.rating}`}
                className="text-xl font-medium">
                {product.rating}
              </p>
            </div>
          </div>

          {/* 패키지 정보 */}
          <div className="grid grid-cols-[3fr_1fr] h-4/5">
            <div className="py-4 pr-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-2.5">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <BiCalendarAlt className="text-base" />
                    <p className="font-bold">체크인</p>
                  </div>
                  <time
                    aria-label="체크인 시간"
                    dateTime={formatDate(product.check_in)}>
                    {formatDate(product.check_in)}
                  </time>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <BiCalendarAlt className="text-base" />
                    <p className="font-bold">체크아웃</p>
                  </div>
                  <time
                    aria-label="체크아웃 시간"
                    dateTime={formatDate(product.check_out)}>
                    {formatDate(product.check_out)}
                  </time>
                </div>
              </div>

              <p
                className="line-clamp-2"
                aria-label="숙소 간단 설명">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col border-l border-gray-200 pl-4 py-4">
              {/* 가격정보 */}
              <div
                title="가격정보"
                className="flex flex-col justify-around items-start">
                <div title="숙소 가격 정보">
                  <p
                    className="line-through text-red-600"
                    aria-label="정가">
                    {formatNumber(product.original_price)}원
                  </p>

                  <p
                    className="underline font-bold text-2xl transition-colors"
                    aria-label="할인가">
                    {formatNumber(product.final_price)}원
                  </p>
                </div>

                <span aria-label="할인율">{product.discount_rate * 100}%</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
