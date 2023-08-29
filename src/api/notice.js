import instance from '../Shared/axios';

export const noticeApis = {
  getNoticeList: async (page, selectType) =>
    await instance.get(`makers/board?limit=15&page=${page}`, {
      params: {
        type: selectType === 99 ? null : selectType,
      },
    }),
};
