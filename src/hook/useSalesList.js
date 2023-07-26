import {useQuery} from 'react-query';
import {salesApis} from '../api/sales';

export function useGetSalesList(startDate, endDate, diningSelect,tab) {
  return useQuery(
    'salesList',
    () => {
      return salesApis.loadSalesList(startDate, endDate, diningSelect);
    },
    {
      refetchInterval:tab!==1 && 3000,
      retry: false,
      onSuccess:()=>{
        console.log("판매내역 조회")
      }
    },
  );
}
export function useGetDeliveryList(startDate, endDate, diningSelect,tab) {
  return useQuery(
    'deliveryList',
    () => {
      return salesApis.loadSalesList(startDate, endDate, diningSelect);
    },
    {
      refetchInterval:tab===1 && 3000,
      retry: false,
      onSuccess:()=>{
        console.log("판매내역 조회2")
      }
    },
  );
}
