import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BiChevronRight,
  BiBuildings,
  BiUser,
  BiCalendarAlt,
} from 'react-icons/bi';
import { formatDate } from '../../../utils/format';

const OrderCard = ({ data, index }) => {
  const navigate = useNavigate();

  return (
    <div
      key={index}
      className="list-row flex-col flex my-3 mx-5 border-gray-200">
      <div className="pb-4 border-b border-stone-200 flex justify-between items-center">
        {/* <div>{formatDate(data.order_date)}</div> */}
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => navigate(`/product/${data.accommodation_id}`)}>
          <BiChevronRight className="size-6" />
        </button>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-6 pt-6">
          <img
            className="size-24 rounded-box"
            src={data?.images?.[0] || 'https://via.placeholder.com/100'}
            alt={data.accomData.name || '숙소 정보 없음'}
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">
              {data.name || '숙소 정보 없음'}
              <p className="flex items-center gap-1 text-gray-500 text-xs">
                <BiBuildings />
                {data.accomData.name}
              </p>
            </h2>
            <div className="text-xs uppercase opacity-60 pt-1">
              {/* 예약번호 : {data.id} */}
            </div>

            {/* 인원 정보 */}
            <div className="flex items-center gap-2 mt-2">
              <BiUser />
              <div className="mr-1 text-sm">
                성인: {data.capacity?.adults ?? 0}명, 미성년자:{' '}
                {data.capacity.children ?? 0}명
              </div>
            </div>

            {/* 체크인/체크아웃 날짜 */}
            <div className="flex items-center gap-10 mt-2">
              <div className="flex items-center gap-2">
                <BiCalendarAlt />
                <span className="font-bold">체크인:</span>{' '}
                <span>{formatDate(data.check_in) || '날짜 없음'}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiCalendarAlt />
                <span className="font-bold">체크아웃:</span>{' '}
                <span>{formatDate(data.check_out) || '날짜 없음'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
