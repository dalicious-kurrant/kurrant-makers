import {useEffect} from 'react';
import styled from 'styled-components';
import ReviewListEach from './ReviewListEach';

const ReviewListRoom = ({reviewList}) => {
  useEffect(() => {
    console.log(reviewList);
  }, [reviewList]);

  return (
    <Container>
      <TestDiv>
        {reviewList.map((v, i) => {
          return <ReviewListEach key={i} data={v} />;
        })}
      </TestDiv>
    </Container>
  );
};

export default ReviewListRoom;

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  /* height: 40rem; */
  overflow: auto;
  /* flex: 8; */
  padding: 8px 14px;
  position: relative;
  border: 1px solid black;
`;

const TestDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
