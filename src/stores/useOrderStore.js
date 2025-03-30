import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderStore = create()(
  persist((set) => ({
    orderIds: [],
    setRoomIds: (orderIds) =>
      set((state) => {
        orderIds: [...orderIds];
      }),
    addRoomIds: (orderId) =>
      set((state) => {
        orderIds: [...state.orderIds, orderId];
      }),
    resetRoomIds: () =>
      set((state) => {
        orderIds: [];
      }),
  })),
);

export default useOrderStore;
