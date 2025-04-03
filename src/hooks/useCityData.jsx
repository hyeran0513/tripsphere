import { useQuery } from '@tanstack/react-query';
import { getCities } from '../services/cityService';

// 도시 조회
export const useCityData = () => {
  return useQuery({
    queryKey: ['city'],
    queryFn: () => getCities(),
  });
};
