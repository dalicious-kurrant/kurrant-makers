import instance from '../Shared/axios';

export const makersApis = {
  makersInfomation: async () => await instance.get('makers/info'),
  originInformation: async () => await instance.get('makers/info/origins'),
  addOriginInformation: async data =>
    await instance.post('makers/info/origins', data),
  modifyOriginInformation: async data =>
    await instance.patch('makers/info/origins', data),
};
