import { create } from 'zustand';

const useFilterStore = create((set) => ({
  selectedCity: '',
  selectedSubCity: '',
  adultCount: 0,
  childrenCount: 0,
  checkIn: '',
  checkOut: '',

  // 지역 대분류(시·도) 변경
  setSelectedCity: (city) => set({ selectedCity: city }),

  // 지역 소분류(시·군·구) 변경
  setSelectedSubCity: (subCity) => set({ selectedSubCity: subCity }),

  // 어른 수 변경
  setAdultCount: (num) => set({ adultCount: num }),

  // 미성년자 수 변경
  setChildrenCount: (num) => set({ childrenCount: num }),

  // 체크인 날짜 변경
  setCheckIn: (date) => set({ checkIn: date }),

  // 체크아웃 날짜 변경
  setCheckOut: (date) => set({ checkOut: date }),

  // 상태 초기화
  resetFilter: () =>
    set({
      selectedCity: '',
      selectedSubCity: '',
      adultCount: 0,
      childrenCount: 0,
      checkIn: '',
      checkOut: '',
    }),
}));

export default useFilterStore;
