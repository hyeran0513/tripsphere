import { formatNumber, totalDays } from '../../../utils/format';

const PriceDetails = ({ totalPrice, checkIn, checkOut, product }) => (
  <div className="flex items-center justify-between py-2">
    {/* 총 금액 계산식 */}
    {totalDays(checkIn, checkOut) !== 0 ? (
      <p className="flex gap-2 text-xl font-bold">
        <span>{formatNumber(product.final_price)}</span>
        <span>X</span>
        <span>{totalDays(checkIn, checkOut)}박</span>
      </p>
    ) : (
      <>총액</>
    )}

    {/* 총 금액 */}
    <p className="text-red-500 text-xl font-bold text-right">
      {formatNumber(totalPrice)}원
    </p>
  </div>
);

export default PriceDetails;
