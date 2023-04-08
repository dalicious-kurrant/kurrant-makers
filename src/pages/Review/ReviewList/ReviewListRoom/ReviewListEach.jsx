import styled from 'styled-components';
import RateStars from '../../Common/RateStars';

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

  return (
    <Container>
      <Wrap1>
        <OrderItemName>자장면</OrderItemName>
        <Content>라라라라라라ㅏ라랄</Content>

        <Writer>작성자: 라라ㅏ라라라</Writer>

        <RateStars
          ratingInput={data.satisfaction}
          width={'100px'}
          margin={'1px'}
        />
      </Wrap1>
      <Wrap2>
        <Pic></Pic>

        <CreateDate>2013-11-12</CreateDate>
      </Wrap2>
    </Container>
  );
};

export default ReviewListEach;

const Container = styled.div`
  border: 1px solid black;
  display: flex;

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
const Pic = styled.img``;
const CreateDate = styled.span``;
