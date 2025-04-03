import { create } from 'zustand';

const useReservationStore = create((set) => ({
  adultCount: 0,
  childrenCount: 0,
  checkIn: new Date().toISOString().split('T')[0],
  checkOut: new Date().toISOString().split('T')[0],
  totalPrice: 0,
  accommodationId: '',

  // 어른 수 변경
  setAdultCount: (num) => {
    set({ adultCount: Number(num) || 0 });
  },

  // 미성년자 수 변경
  setChildrenCount: (num) => {
    set({ childrenCount: Number(num) || 0 });
  },

  // 체크인 날짜 변경
  setCheckIn: (date) => {
    set({
      checkIn:
        new Date(date).toISOString().split('T')[0] ||
        new Date().toISOString().split('T')[0],
    });
  },

  // 체크아웃 날짜 변경
  setCheckOut: (date) => {
    set({
      checkOut:
        new Date(date).toISOString().split('T')[0] ||
        new Date().toISOString().split('T')[0],
    });
  },

  // 총 예약 금액
  setTotalPrice: (num) => {
    set({ totalPrice: Number(num) || 0 });
  },

  // 상품 ID
  setAccommodationId: (id) => {
    set({ accommodationId: String(id).trim() || '' });
  },

  // 상태 초기화
  resetReservation: () =>
    set({
      adultCount: 0,
      childrenCount: 0,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date().toISOString().split('T')[0],
      totalPrice: 0,
      accommodationId: '',
    }),
}));

export default useReservationStore;
