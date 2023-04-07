import {useQuery} from 'react-query';
import instance from '../../../Shared/axios';
import {useEffect, useState} from 'react';

const useGetReviewQuery = (unanswered, total) => {
  // 미답변 리뷰 가져오기

  const [unansweredTotalPage, setUnansweredTotalPage] = useState(0);

  // 전체 리뷰 가져오기

  const [everyListTotalPage, setEveryListTotalPage] = useState(0);

  // 리스트
  const [reviewList, setReviewList] = useState([]);

  const {refetch: eveyListQueryRefetch} = useQuery(
    total[0],

    async ({queryKey}) => {
      const response = await instance.get(total[1]);

      // 메이커스 목록

      setReviewList(response.data.data.items);
      // setReviewList(response);

      setEveryListTotalPage(response.data.total);

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
      const response = await instance.get(unanswered[1]);

      // 메이커스 목록

      setReviewList(response.data.data.items.reviewListDtoList);
      setUnansweredTotalPage(response.data.total);

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
    everyListTotalPage,

    unansweredQueryRefetch,
    eveyListQueryRefetch,
  };
};
export default useGetReviewQuery;
