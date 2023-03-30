import {adjustApis} from '../api/adjustment';
import {QueryClient, useMutation, useQuery} from 'react-query';

const queryClient = new QueryClient();
export function useSaveMakersAdjust() {
  return useMutation(
    (formData, config) => adjustApis.saveAdjustMakers(formData, config),
    {
      onSuccess: res => {
        queryClient.invalidateQueries(['makersAdjustList']);
      },
      onError: e => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요', e.toString());
      },
    },
  );
}
export function useMakersAdjustList() {
  return useQuery('paycheck', () => {
    return adjustApis.getAdjustMakersList();
  });
}
export function useMakersList() {
  return useQuery('makersList', () => {
    return adjustApis.getMakersList();
  });
}
