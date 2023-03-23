import {useMutation, useQuery, useQueryClient} from 'react-query';
import {makersApis} from '../api/makers';

export function useGetMakersInfo() {
  return useQuery('makersInfo', () => {
    return makersApis.makersInfomation();
  });
}

export function useGetOriginInfo() {
  return useQuery('originInfo', () => {
    return makersApis.originInformation();
  });
}

export function useAddOriginInfo() {
  const queryClient = useQueryClient();
  return useMutation(data => makersApis.addOriginInformation(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('originInfo');
    },
    onError: () => {
      alert('동일한 품목이 존재합니다.');
    },
  });
}

export function useEditOriginInfo() {
  const queryClient = useQueryClient();
  return useMutation(data => makersApis.modifyOriginInformation(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('originInfo');
    },
    onError: () => {
      alert('동일한 품목이 존재합니다.');
    },
  });
}
