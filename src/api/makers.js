import instance from '../Shared/axios';

export const makersApis = {
  makersInfomation: async () => await instance.get('makers/info'),
};
