import { create } from 'zustand';

const useFilterStore = create((set) => ({
  selectedCity: '',
  selectedSubCity: '',
  adultCount: 0,
  childrenCount: 0,
  checkIn: new Date().toISOString().split('T')[0],
  checkOut: new Date().toISOString().split('T')[0],

  // 지역 대분류(시·도) 변경
  setSelectedCity: (city) => set({ selectedCity: String(city).trim() }),

  // 지역 소분류(시·군·구) 변경
  setSelectedSubCity: (subCity) =>
    set({ selectedSubCity: String(subCity).trim() }),

  // 어른 수 변경
  setAdultCount: (num) => set({ adultCount: Number(num) || 0 }),

  // 미성년자 수 변경
  setChildrenCount: (num) => set({ childrenCount: Number(num) || 0 }),

  // 체크인 날짜 변경
  setCheckIn: (date) =>
    set({
      checkIn:
        new Date(date).toISOString().split('T')[0] ||
        new Date().toISOString().split('T')[0],
    }),

  // 체크아웃 날짜 변경
  setCheckOut: (date) =>
    set({
      checkOut:
        new Date(date).toISOString().split('T')[0] ||
        new Date().toISOString().split('T')[0],
    }),

  // 상태 초기화
  resetFilter: () =>
    set({
      selectedCity: '',
      selectedSubCity: '',
      adultCount: 0,
      childrenCount: 0,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date().toISOString().split('T')[0],
    }),
}));

export default useFilterStore;
