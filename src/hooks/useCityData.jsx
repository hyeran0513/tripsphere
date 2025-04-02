import { useMutation, useQuery } from '@tanstack/react-query';
import { addCities, getCities } from '../services/cityService';

// 도시 조회
export const useCityData = () => {
  return useQuery({
    queryKey: ['city'],
    queryFn: () => getCities(),
  });
};

// 도시 추가
export const useAddCityData = () => {
  return useMutation({
    mutationKey: ['cities'],
    mutationFn: () => addCities(),
  });
};
