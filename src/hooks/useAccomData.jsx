import { useQuery } from '@tanstack/react-query';
import { getFilteredAccommodations } from '../services/accomService';

export const useAccommodations = (filters) => {
  return useQuery({
    queryKey: ['accommodations', filters],
    queryFn: () => getFilteredAccommodations(filters),
    staleTime: 1000 * 60 * 3,
    enabled: !!filters,
  });
};
