import instance from '../Shared/axios';

export const adjustApis = {
  getAdjustMakersList: async () => await instance.get('paycheck'),
};
