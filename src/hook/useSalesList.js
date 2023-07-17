import {useQuery} from 'react-query';
import {salesApis} from '../api/sales';

export function useGetSalesList(startDate, endDate, diningSelect) {
  return useQuery(
    'salesList',
    () => {
      return salesApis.loadSalesList(startDate, endDate, diningSelect);
    },
    {
      retry: false,
      staleTime: 5 * 1000,
    },
  );
}
