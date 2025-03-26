import React, { useEffect } from 'react';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';

const CheckoutExample = () => {
  const { reservationInfo } = useRoomSelectionStore();

  return (
    <div>
      <h1>결제 페이지</h1>
      {reservationInfo && <pre>{JSON.stringify(reservationInfo, null, 2)}</pre>}
    </div>
  );
};

export default CheckoutExample;
