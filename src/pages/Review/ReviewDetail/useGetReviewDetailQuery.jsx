import {useQuery} from 'react-query';
import instance from '../../../Shared/axios';
import {useState} from 'react';
import {useAtom} from 'jotai';
import {reviewDetailAtom} from './store';

const useGetReviewDetailQuery = (uniqueQueryKey, url) => {
  //   const [reviewDetail, setReviewDetail] = useState({});
  const [reviewDetail, setReviewDetail] = useAtom(reviewDetailAtom);

  const {
    data,
    status,
    isLoading,
    refetch: reviewDetailQueryRefetch,
  } = useQuery(
    uniqueQueryKey,

    async ({queryKey}) => {
      const response = await instance.get(url);

      //   console.log(response.data.data);
      setReviewDetail(response.data.data);
      return response.data;
    },
    {
      enabled: false,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {reviewDetail, reviewDetailQueryRefetch};
};

export default useGetReviewDetailQuery;
