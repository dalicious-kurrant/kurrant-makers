import {useQuery} from 'react-query';
import {salesApis} from '../api/sales';

export function useGetSalesList(startDate, endDate, diningSelect) {
  console.log('기간별 판매내역 최신화');
  return useQuery(
    'salesList',
    () => {
      return salesApis.loadSalesList(startDate, endDate, diningSelect);
    },
    {
      refetchInterval: 20000,
      staleTime: 5 * 1000,
    },
  );
}
