import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useOrderStore = create(
  persist(
    (set) => ({
      orderIds: [],
      setOrderIds: (orderIds) =>
        set((state) => ({
          orderIds: [...orderIds],
        })),
      resetOrderIds: () =>
        set((state) => ({
          orderIds: [],
        })),
    }),
    { name: 'order-storage' },
  ),
);

export default useOrderStore;
