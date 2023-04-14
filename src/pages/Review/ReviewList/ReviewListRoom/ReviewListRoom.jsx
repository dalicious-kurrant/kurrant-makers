import {useEffect} from 'react';
import styled from 'styled-components';
import ReviewListEach from './ReviewListEach';

const ReviewListRoom = ({reviewList}) => {
  // console.log(reviewList);

  return (
    <Container>
      {reviewList.map((v, i) => {
        return <ReviewListEach key={i} data={v} />;
      })}
    </Container>
  );
};

export default ReviewListRoom;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  padding: 8px 14px;
  position: relative;
`;
