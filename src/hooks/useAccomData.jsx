import { useQuery } from '@tanstack/react-query';
import { getAccomData } from '../services/accomService';

export const useAccomData = (filters) => {
  return useQuery({
    queryKey: ['accom'],
    queryFn: () => getAccomData(filters),
  });
};
