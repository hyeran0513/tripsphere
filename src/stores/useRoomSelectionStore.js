import { create } from 'zustand';

const useRoomSelectionStore = create((set) => ({
  reservationInfo: null,
  setReservationInfo: (info) => set({ reservationInfo: info }),
  clearReservationInfo: () => set({ reservationInfo: null }),
}));

export default useRoomSelectionStore;
