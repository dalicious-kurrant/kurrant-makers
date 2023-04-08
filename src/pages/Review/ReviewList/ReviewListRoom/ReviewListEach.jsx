import styled from 'styled-components';
import RateStars from '../../Common/RateStars';
import ReviewListEachImage from './ReviewListEachImage';

const ReviewListEach = ({data}) => {
  //   content: '레몬에이드~~~~~~~';
  //   createDate: '2023-04-07';
  //   forMakers: false;
  //   imageLocation: null;
  //   isReport: false;
  //   orderItemName: '레몬에이드';
  //   reviewId: 11;
  //   satisfaction: 5;
  //   updateDate: '2023-04-07';
  //   writer: '김지혜';

  const handleClick = () => {
    console.log(data.reviewId);
  };

  return (
    <Container onClick={handleClick}>
      <Wrap1>
        <OrderItemName>{data.orderItemName}</OrderItemName>
        <Content>{data.content}</Content>

        <Writer>{data.writer}</Writer>

        <RateStars
          ratingInput={data.satisfaction}
          width={'100px'}
          margin={'1px'}
        />
      </Wrap1>
      <Wrap2>
        <ReviewListEachImage url={data.imageLocation} />

        <CreateDate>{data.createDate}</CreateDate>
      </Wrap2>
    </Container>
  );
};

export default ReviewListEach;

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  cursor: pointer;

  margin-bottom: 10px;
  border-radius: 8px;
  padding: 12px;
`;

const Wrap1 = styled.div`
  flex: 8;
`;
const OrderItemName = styled.span``;
const Content = styled.p``;
const Writer = styled.span``;

const Wrap2 = styled.div`
  flex: 3;
`;
const PicWrap = styled.div``;
const Pic = styled.img``;
const CreateDate = styled.span``;
