import {adjustApis} from '../api/adjustment';
import {QueryClient, useMutation, useQuery} from 'react-query';

const queryClient = new QueryClient();

export function useMakersAdjustList() {
  return useQuery('paycheck', () => {
    return adjustApis.getAdjustMakersList();
  });
}
