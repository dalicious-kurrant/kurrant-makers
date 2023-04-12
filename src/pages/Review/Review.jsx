import styled from 'styled-components';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import ReviewList from './ReviewList/ReviewList';

const Review = () => {
  return (
    <Container>
      <ReviewList />
      <ReviewDetail />
    </Container>
  );
};

export default Review;

const Container = styled.div`
  /* padding: 30px 10px; */
  height: 100%;
  display: flex;
`;
