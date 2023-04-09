import styled from 'styled-components';
import useGetReviewDetailQuery from './useGetReviewDetailQuery';
import {useEffect} from 'react';
import {reviewDetailAtom} from './store';
import {useAtom} from 'jotai';

const ReviewDetail = () => {
  // const {reviewDetail} = useGetReviewDetailQuery(
  //   ['getReviewDetail'],

  //   `makers/reviews/detail?reviewId=11`,
  // );
  const [reviewDetail, setReviewDetail] = useAtom(reviewDetailAtom);

  useEffect(() => {
    console.log('잘 들어오고있다');
    console.log(reviewDetail);
  }, [reviewDetail]);

  return <Container></Container>;
};

export default ReviewDetail;

const Container = styled.div`
  border: 1px solid black;
  height: 100%;
  flex: 7;
`;
