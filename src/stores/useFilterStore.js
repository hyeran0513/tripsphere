import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFilterStore = create()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'filterStore',
    },
  ),
);

export default useFilterStore;
