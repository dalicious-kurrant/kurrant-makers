import instance from '../Shared/axios';

export const adjustApis = {
  saveAdjustMakers: async (formData, config) =>
    await instance.post('paycheck/makers', formData, config),
  getAdjustMakersList: async () => await instance.get('paycheck'),
};
