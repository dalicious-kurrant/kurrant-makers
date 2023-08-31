import {useMutation, useQuery} from 'react-query';
import {productApis} from '../api/product';

export function useGetAllProductsList() {
  return useQuery('allList', () => {
    return productApis.allProductsList();
  });
}

export function useGetMakerProductsList(status) {
  return useQuery('makerList', () => {
    return productApis.makersProductList(status);
  });
}

export function useGetProductDetail(id) {
  return useQuery('productDetail', () => {
    return productApis.productDetail(id);
  });
}

export function useEditProductDetail() {
  return useMutation(data => {
    return productApis.modifyProductDetail(data);
  });
}

export function useDeleteProductList() {
  return useMutation(data => {
    console.log(data, '2323');
    return productApis.deleteProduct(data);
  });
}
