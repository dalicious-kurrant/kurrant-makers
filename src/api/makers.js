import instance from '../Shared/axios';

export const makersApis = {
  makersInfomation: async () => await instance.get('makers/info'),
  originInformation: async () => await instance.get('makers/info/origins'),
  addOriginInformation: async data =>
    await instance.post('makers/info/origins', data),
  modifyOriginInformation: async data =>
    await instance.patch('makers/info/origins', data),
  deleteOriginInformation: async data =>
    await instance.delete('makers/info/origins', {data: data}),
  documentsInformation: async () => await instance.get('makers/info/documents'),
  modifyDocuments: async (formData, config) =>
    await instance.patch('makers/info/documents', formData, config),
};
