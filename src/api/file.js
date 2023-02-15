import instance from '../Shared/axios';

export const fileApis = {
  excelFilePost: async (formData, config) =>
    await instance.post('makers/files/excel/all', formData, config),
};
