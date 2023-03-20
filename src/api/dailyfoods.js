import instance from '../Shared/axios';

export const dailyfoodApis = {
  getDailyFoods: async (startDate, endDate) =>
    await instance.get(
      `makers/dailyFoods?startDate=${startDate}&endDate=${endDate}`,
    ),
};
