import instance from '../Shared/axios';

export const productApis = {
  allProductsList: async () => await instance.get('makers/foods/all'),
  makersProductList: async (status) => await instance.get(`makers/foods?status=${status}`),
  productDetail: async id => await instance.get(`makers/foods/${id}`),
  modifyProductDetail: async data => await instance.put('makers/foods', data),
  deleteProduct: async data => await instance.delete('makers/foods', data),
};
