import instance from '../Shared/axios';

export const calendarApis = {
  getCalendarList: async (page) => await instance.get(`makers/schedules?page=1`),
  accessHandler: async (body) => await instance.post(`makers/schedules`, {
    ...body,
  }),
};
