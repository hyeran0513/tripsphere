import { formatNumber } from '../../utils/format';

const PriceInfo = ({ room }) => (
  <div className="mt-4 flex flex-col items-end">
    <div className="flex items-center gap-2">
      {/* 할인율 */}
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        {room.discount_rate * 100}%
      </span>

      {/* 원가 */}
      <span className="line-through text-sm text-gray-300 dark:text-white">
        {formatNumber(room.original_price)}원
      </span>
    </div>

    {/* 최종 금액 */}
    <div className="font-semibold text-lg text-gray-90 dark:text-white">
      {formatNumber(room.original_price * (1 - room.discount_rate))}원
    </div>
  </div>
);

export default PriceInfo;
