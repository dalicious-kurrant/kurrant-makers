import styled from 'styled-components';
import RateStars from '../../Common/RateStars';
import ReviewListEachImage from './ReviewListEachImage';

import imageSample from '../../../../assets/img/image_sample.jpg';

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
        <Wrap3>
          <OrderItemName>{data.orderItemName}</OrderItemName>
          <ContentDiv>
            <Content>{data.content}</Content>
            {/* sldkfjslkdfjlsdkjflskdjflskdjflskdjflskdfjlskdfjsdkljfsdlkjsdfsdfsdfsdfsldkfjslkdfjlsdkjflskdjflskdjflskdjflskdfjlskdfjsdkljfsdlkjsdfsdfsdfsdf */}
            {/* <Content>
            sldkfjslkdfjlsdkjflskdjflskdjflskdjflskdfjlskdfjsdkljfsdlkjsdfsdfsdfsdfsldkfjslkdfjlsdkjflskdjflskdjflskdjflskdfjlskdfjsdkljfsdlkjsdfsdfsdfsdf
          </Content> */}
          </ContentDiv>
        </Wrap3>

        <Wrap3>
          <Writer>{data.writer}</Writer>

          <RateStars
            ratingInput={data.satisfaction}
            width={'100px'}
            margin={'1px'}
          />
        </Wrap3>
      </Wrap1>
      <Wrap2>
        <ReviewListEachImage url={data.imageLocation} />
        {/* <ReviewListEachImage url={imageSample} /> */}

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
  background-color: #fff;
`;

const Wrap1 = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  justify-content: space-between;
`;
const OrderItemName = styled.span`
  margin-bottom: 3px;
`;

const ContentDiv = styled.div`
  width: 200px;
  /* height: 30px; */
  /* border: 1px solid black; */

  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
  /* display: -webkit-box; */
  /* display: -webkit-inline-box; */
  /* -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden; */
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.p`
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; */
`;
const Writer = styled.span``;

const Wrap2 = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`;

const Wrap3 = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateDate = styled.span``;
