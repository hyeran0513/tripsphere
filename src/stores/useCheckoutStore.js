import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCheckoutStore = create()(
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
    }),
    { name: 'checkout-storage' },
  ),
);

export default useCheckoutStore;
