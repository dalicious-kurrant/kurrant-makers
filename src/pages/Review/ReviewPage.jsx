import styled from 'styled-components';
import Review from './Review';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useAtom} from 'jotai';
import {isUrlReviewAtom} from './store';

const ReviewPage = () => {
  // review일떄는 딱 붙게 하기

  const {pathname} = useLocation();
  const [, setIsUrlReview] = useAtom(isUrlReviewAtom);

  useEffect(() => {
    if (pathname === '/review') {
      setIsUrlReview(true);
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      setIsUrlReview(false);
    };
  }, []);

  return (
    <ReviewPageContainer id="review">
      <Review />
    </ReviewPageContainer>
  );
};
export default ReviewPage;

const ReviewPageContainer = styled.section`
  height: 100vh;
`;
