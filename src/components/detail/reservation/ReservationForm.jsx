import DateSelector from '../../common/DateSelector';
import PeopleSelector from '../../common/PeopleSelector';

const ReservationForm = ({
  openDate,
  setOpenDate,
  adults,
  setAdults,
  product,
}) => (
  <div className="flex flex-col gap-2 border border-base-300 dark:border-gray-100 p-4 rounded-box">
    {/* 체크인 · 체크아웃 */}
    <DateSelector
      stateType="reservation"
      openDate={openDate}
      setOpenDate={setOpenDate}
      bookedDates={product?.booked_dates}
    />

    {/* 인원수 */}
    <PeopleSelector
      adults={adults}
      setAdults={setAdults}
      stateType="reservation"
      capacity={product.capacity}
    />
  </div>
);

export default ReservationForm;
