import {useQuery} from 'react-query';
import instance from '../../../Shared/axios';
import {useEffect, useState} from 'react';
import {useRef} from 'react';
import {useAtom} from 'jotai';
import {
  AllTotalCountAtom,
  UnansweredTotalCountAtom,
  unansweredOrTotalAtom,
} from './store';

const useGetReviewQuery = (unanswered, all) => {
  // 미답변 리뷰 가져오기

  const [unansweredTotalPage, setUnansweredTotalPage] = useState(0);
  const [reviewList, setReviewList] = useState([]);

  // 미답변 리뷰, 전체리스트

  const [allList, setAllList] = useState([]);
  const [unansweredList, setUnansweredList] = useState([]);

  // 총 몇개인지 보기

  const [unansweredTotalCount, setUnansweredTotalCount] = useAtom(
    UnansweredTotalCountAtom,
  );
  const [allTotalCount, setAllTotalCount] = useAtom(AllTotalCountAtom);

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

  // 전체 리뷰 가져오기

  const [allListTotalPage, setAllListTotalPage] = useState(0);

  // 전체 리스트 보기 GET

  const {refetch: allListQueryRefetch} = useQuery(
    all[0],

    async ({queryKey}) => {
      const response = await instance.get(all[1]);
      console.log('전체리스트');
      console.log(response.data);
      setAllList(response.data.data.items);
      setAllListTotalPage(response.data.data.total);
      setAllTotalCount(response.data.data.items.count);
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
      const response = await instance.get(unanswered[1]);

      console.log('미답변리스트');
      console.log(response.data);

      setUnansweredList(response.data.data.items.reviewListDtoList);
      setUnansweredTotalPage(response.data.data.total);
      setUnansweredTotalCount(response.data.data.items.count);
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
    unansweredTotalCount,
    allTotalCount,
    unansweredQueryRefetch,
    allListQueryRefetch,
  };
};
export default useGetReviewQuery;
