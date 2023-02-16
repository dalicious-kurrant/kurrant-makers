import instance from '../Shared/axios';

export const calendarApis = {
  getCalendarList: async () => await instance.get('makers/foods/all'),
};
