import instance from '../Shared/axios';

export const adjustApis = {
  getAdjustMakersList: async (
    startMonth,
    endMonth,
    selectClient,
    selectStatus,
    selectModify,
  ) =>
    await instance.get(
      `paycheck?startYearMonth=${startMonth}&endYearMonth=${endMonth}`,
      {
        params: {
          corporationIds:
            selectClient.length === 0 ? null : selectClient.join(','),
          status: selectStatus === 99 ? null : selectStatus,
          hasRequest: selectModify === 99 ? null : selectModify,
        },
      },
    ),
  paycheckDetail: async id => await instance.get(`paycheck/${id}`),
  addMemo: async data =>
    await instance.put(`paycheck/${data.id}/memo`, {memo: data.memo}),
  adjustComplete: async data =>
    await instance.put(`paycheck/status/${data.value}`, data.id),
};
