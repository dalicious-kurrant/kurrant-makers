import {useQuery} from 'react-query';
import instance from '../../../Shared/axios';
import {useEffect, useState} from 'react';

const useGetReviewQuery = (unanswered, all) => {
  // 미답변 리뷰 가져오기

  const [unansweredTotalPage, setUnansweredTotalPage] = useState(0);

  // 전체 리뷰 가져오기

  const [allListTotalPage, setAllListTotalPage] = useState(0);

  // 리스트
  const [reviewList, setReviewList] = useState([]);

  const {refetch: allListQueryRefetch} = useQuery(
    all[0],

    async ({queryKey}) => {
      console.log(all[1]);
      const response = await instance.get(all[1]);

      // 메이커스 목록

      setReviewList(response.data.data.items);
      // setReviewList(response);

      setAllListTotalPage(response.data.data.total);

      return response.data;
    },
    {
      enabled: true,
      retry: 1,
      retryDelay: 800,
    },
  );

  const {
    data,
    status,
    isLoading,
    refetch: unansweredQueryRefetch,
  } = useQuery(
    unanswered[0],

    async ({queryKey}) => {
      console.log(unanswered[1]);
      const response = await instance.get(unanswered[1]);

      // 메이커스 목록

      setReviewList(response.data.data.items.reviewListDtoList);
      setUnansweredTotalPage(response.data.data.total);

      return response.data;
    },
    {
      enabled: true,
      retry: 1,
      retryDelay: 800,
    },
  );

  ////////////////

  return {
    reviewList,
    unansweredTotalPage,
    allListTotalPage,

    unansweredQueryRefetch,
    allListQueryRefetch,
  };
};
export default useGetReviewQuery;
