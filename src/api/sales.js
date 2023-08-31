import instance from '../Shared/axios';

export const salesApis = {
  loadSalesList: async (startDate, endDate, diningSelect) =>
    await instance.get(
      `/makers/orders/deliveies?startDate=${startDate}&endDate=${endDate}&diningTypes=${diningSelect}`,
    ),
};
