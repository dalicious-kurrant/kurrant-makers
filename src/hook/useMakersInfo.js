import {useQuery} from 'react-query';
import {makersApis} from '../api/makers';

export function useGetMakersInfo() {
  return useQuery('makersInfo', () => {
    return makersApis.makersInfomation();
  });
}
