import { useQuery } from '@tanstack/react-query';
// import { fetchAccomListData } from '../services/productListService';
import { getAllAccomData } from '../services/productListService';

// 숙소 리스트 조회
export const useAccomListData = (filters) => {
  // return useQuery({
  //   queryKey: ['accommodation', accomRegion, priceRange],
  //   queryFn: () => getAllAccomData(accomRegion, priceRange),
  //   enabled: [!!accomRegion, !!priceRange],
  // });
  return useQuery({
    queryKey: ['accommodations', filters],
    queryFn: () => getAllAccomData(filters),
    enabled: !!filters,
  });
};
