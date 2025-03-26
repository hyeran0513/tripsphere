import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//로컬스토리지에 임시저장
// DB쿼리 감소
const useProductListStore = create()(
  persist(
    (set) => ({
      list: [],
      setList: (data) =>
        set(() => ({
          list: data,
        })),
      resetList: () =>
        set(() => ({
          list: [],
        })),
    }),
    {
      name: 'productListStorage',
    },
  ),
);

export default useProductListStore;
