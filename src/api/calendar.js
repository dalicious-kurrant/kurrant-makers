import instance from '../Shared/axios';

export const calendarApis = {
  getCalendarList: async page =>
    await instance.get(`makers/schedules?page=${page}`),
  accessHandler: async body =>
    await instance.post(`makers/schedules`, {
      ...body,
    }),
};
