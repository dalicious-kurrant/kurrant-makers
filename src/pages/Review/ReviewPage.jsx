import styled from 'styled-components';
import Review from './Review';

const ReviewPage = () => {
  return (
    <ReviewPageContainer>
      <Review />
    </ReviewPageContainer>
  );
};
export default ReviewPage;

const ReviewPageContainer = styled.section`
  width: 80vw;
  height: 100vh;
`;
