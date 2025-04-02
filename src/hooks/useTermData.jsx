import { useQuery } from '@tanstack/react-query';
import { getTerms } from '../services/termService';

// 이용약관 조회
export const useTermData = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: () => getTerms(),
  });
};
