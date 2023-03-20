import {useQuery} from 'react-query';
import {dailyfoodApis} from '../api/dailyfoods';

export function useGetDailyFoodList(startDate, endDate) {
  return useQuery('dailyfood', () => {
    return dailyfoodApis.getDailyFoods(startDate, endDate);
  });
}
