import {useQuery} from 'react-query';
import instance from '../../../Shared/axios';
import {useEffect, useState} from 'react';

const useReviewListQuery = (unansweredQueryKey, unansweredUrl) => {
  // 미답변 리뷰 가져오기
  const [unansweredList, setUnansweredList] = useState([]);

  useEffect(() => {
    console.log(unansweredList);
  }, [unansweredList]);

  const [totalPage, setTotalPage] = useState(0);

  const {
    data,
    status,
    isLoading,
    refetch: unansweredQueryRefetch,
  } = useQuery(
    unansweredQueryKey,

    async ({queryKey}) => {
      const response = await instance.get(unansweredUrl);

      // 메이커스 목록

      setUnansweredList(response.data.data.items.reviewListDtoList);
      setTotalPage(response.data.total);

      return response.data;
    },
    {
      enabled: true,
      retry: 1,
      retryDelay: 800,
    },
  );

  // 전체리스트 가져오기

  // const {
  //     // data,
  //     // status,
  //     // isLoading,
  //     refetch: totalQueryRefetch,
  //   } = useQuery(
  //     uniqueQueryKey,

  //     async ({unansweredQueryKey}) => {
  //       const response = await instance.get(unansweredUrl);

  //       // 메이커스 목록

  //       return response.data;
  //     },
  //     {
  //       enabled: enable,
  //       retry: 1,
  //       retryDelay: 800,
  //     },
  //   );

  return {unansweredQueryRefetch};
};
export default useReviewListQuery;
