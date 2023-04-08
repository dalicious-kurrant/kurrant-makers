import {useEffect} from 'react';
import styled from 'styled-components';
import ReviewListEach from './ReviewListEach';
import RateStars from '../../Common/RateStars';
import {useState} from 'react';

const ReviewListRoom = ({reviewList}) => {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    console.log(reviewList);
  }, [reviewList]);

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
  /* height: 40rem; */
  /* overflow: auto; */
  overflow-y: scroll;
  /* flex: 8; */
  padding: 8px 14px;
  position: relative;
  /* border: 1px solid black; */
`;
