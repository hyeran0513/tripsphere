import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRoomType = create()(
  persist((set) => ({
    roomTypes: ['hotel', 'motel', 'pension', 'resort', 'camping', 'guest'],
    defaultOption: ['hotel', 'motel', 'pension', 'resort', 'camping', 'guest'],
    addRoomTypes: (data) =>
      set((state) => ({
        roomTypes: [...state.roomTypes, data],
      })),
    delRoomTypes: (data) =>
      set((state) => ({
        roomTypes: state.roomTypes.filter((ele) => ele !== data),
      })),
    resetRoomTypes: () =>
      set(() => ({
        roomTypes: [],
      })),
    getKor: (type) => {
      switch (type) {
        case 'all':
          return '전부';
        case 'hotel':
          return '호텔';
        case 'motel':
          return '모텔';
        case 'pension':
          return '펜션';
        case 'resort':
          return '리조트';
        case 'camping':
          return '캠핑';
        case 'guest':
          return '게스트하우스';
        default:
          return '';
      }
    },
  })),
  {
    name: 'roomTypeStorage',
  },
);
export default useRoomType;
