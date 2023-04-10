import {useQuery} from 'react-query';
import instance from '../../../Shared/axios';
import {useEffect, useState} from 'react';
import {useRef} from 'react';
import {useAtom} from 'jotai';
import {unansweredOrTotalAtom} from './store';

const useGetReviewQuery = (unanswered, all) => {
  // 미답변 리뷰 가져오기

  const [unansweredTotalPage, setUnansweredTotalPage] = useState(0);

  const [reviewList, setReviewList] = useState([]);

  // 미답변 리뷰, 전체리스트

  const [allList, setAllList] = useState([]);
  const [unansweredList, setUnansweredList] = useState([]);

  // true false로 어떤걸 보낼지 확인하기

  const [unansweredOrTotal, setUnansweredOrTotal] = useAtom(
    unansweredOrTotalAtom,
  );

  useEffect(() => {
    if (!unansweredOrTotal) {
      setReviewList(unansweredList);
    } else {
      setReviewList(allList);
    }
  }, [unansweredOrTotal, setReviewList, allList, unansweredList]);

  const [isMount, setIsMount] = useState(false);

  // 전체 리뷰 가져오기

  const [allListTotalPage, setAllListTotalPage] = useState(0);

  // 리스트

  const {refetch: allListQueryRefetch} = useQuery(
    all[0],

    async ({queryKey}) => {
      console.log(all[1]);
      const response = await instance.get(all[1]);

      // 메이커스 목록

      // setReviewList(response.data.data.items);
      setAllList(response.data.data.items);

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

  const {refetch: unansweredQueryRefetch} = useQuery(
    unanswered[0],

    async ({queryKey}) => {
      console.log(unanswered[1]);
      const response = await instance.get(unanswered[1]);

      // 메이커스 목록

      // setReviewList(response.data.data.items.reviewListDtoList);

      setUnansweredList(response.data.data.items.reviewListDtoList);

      setUnansweredTotalPage(response.data.data.total);

      return response.data;
    },
    {
      enabled: true,
      retry: 1,
      retryDelay: 800,
    },
  );

  return {
    reviewList,
    unansweredTotalPage,
    allListTotalPage,
    unansweredQueryRefetch,
    allListQueryRefetch,
  };
};
export default useGetReviewQuery;
