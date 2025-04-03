import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCheckoutStore = create(
  persist(
    (set) => ({
      roomIds: [],
      setRoomIds: (roomIds) =>
        set((state) => ({
          roomIds: [...roomIds],
        })),
      resetRoomIds: () =>
        set((state) => ({
          roomIds: [],
        })),
      reservationInfo: null,
      setReservationInfo: (info) => set({ reservationInfo: info }),
      clearReservationInfo: () => set({ reservationInfo: null }),
    }),
    { name: 'checkout-storage' },
  ),
);

export default useCheckoutStore;
