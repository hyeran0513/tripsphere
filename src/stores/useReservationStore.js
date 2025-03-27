import { create } from 'zustand';

const useReservationStore = create((set) => ({
  adultCount: 0,
  childrenCount: 0,
  checkIn: new Date().toLocaleDateString(),
  checkOut: new Date().toLocaleDateString(),
  totalPrice: 0,
  accommodationId: '',

  // 장바구니
  reservationList: [],
  setReservationList: (list) => set({ reservationList: list }),

  // 어른 수 변경
  setAdultCount: (num) => set({ adultCount: num }),

  // 미성년자 수 변경
  setChildrenCount: (num) => set({ childrenCount: num }),

  // 체크인 날짜 변경
  setCheckIn: (date) => set({ checkIn: date }),

  // 체크아웃 날짜 변경
  setCheckOut: (date) => set({ checkOut: date }),

  // 총 예약 금액
  setTotalPrice: (num) => set({ totalPrice: num }),

  // 상품 ID
  setAccommodationId: (num) => set({ accommodationId: num }),

  // 상태 초기화
  resetReservation: () =>
    set({
      adultCount: 0,
      childrenCount: 0,
      checkIn: new Date().toLocaleDateString(),
      checkOut: new Date().toLocaleDateString(),
      totalPrice: 0,
      accommodationId: '',
    }),
}));

export default useReservationStore;
