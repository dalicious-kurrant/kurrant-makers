import {adjustApis} from '../api/adjustment';
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';

export function useMakersAdjustList(
  startMonth,
  endMonth,
  selectClient,
  selectModify,
  selectStatus,
) {
  return useQuery('paycheck', () => {
    return adjustApis.getAdjustMakersList(
      startMonth,
      endMonth,
      selectClient,
      selectModify,
      selectStatus,
    );
  });
}

export function useMakersAdjustDetail(id) {
  return useQuery('paycheckDetail', () => {
    return adjustApis.paycheckDetail(id);
  });
}

export function useMemoAdjust() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.addMemo(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('paycheckDetail');
    },
  });
}

export function useCompleteAdjust() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.adjustComplete(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('paycheckDetail');
    },
  });
}
