import { useQuery } from '@tanstack/react-query';
import { getAccomData } from '../services/accomService';

export const useAccomData = () => {
  return useQuery({
    queryKey: ['accom'],
    queryFn: () => getAccomData(),
  });
};
