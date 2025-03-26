import { create } from 'zustand';

const useRoomType = create((set) => ({
  roomTypes: ['hotel', 'motel', 'pension', 'resort', 'camping', 'guesthouse'],
  defaultOption: [
    'hotel',
    'motel',
    'pension',
    'resort',
    'camping',
    'guesthouse',
  ],
  addRoomTypes: (data) =>
    set((state) => ({
      roomTypes: [...state.roomTypes, data],
    })),
  delRoomTypes: (data) =>
    set((state) => ({
      roomTypes: state.roomTypes.filter((ele) => ele !== data),
    })),
  resetRoomTypes: () =>
    set((state) => ({
      roomTypes: [...state.defaultOption],
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
      case 'guesthouse':
        return '게스트하우스';
      default:
        return '';
    }
  },
}));
export default useRoomType;
