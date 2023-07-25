import {useQuery} from 'react-query';
import {salesApis} from '../api/sales';

export function useGetSalesList(startDate, endDate, diningSelect) {
  return useQuery(
    'salesList',
    () => {
      return salesApis.loadSalesList(startDate, endDate, diningSelect);
    },
    {
      refetchInterval:3000,
      retry: false,
      onSuccess:()=>{
        console.log("성공")
      }
    },
  );
}
