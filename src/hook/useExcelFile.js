import {useMutation, useQuery} from 'react-query';
import {fileApis} from '../api/file';

export function useExcelPost() {
  const config = {
    headers: {'Content-Type': 'multipart/form-data'},
  };
  return useMutation(formData => {
    return fileApis.excelFilePost(formData, config);
  });
}
