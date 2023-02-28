import instance from '../Shared/axios';

export const calendarApis = {
  getCalendarList: async (limit, page) =>
    await instance.get(`makers/schedules?limit=${limit}&page=${page}`),
  accessHandler: async body =>
    await instance.post(`makers/schedules`, {
      ...body,
    }),
};
