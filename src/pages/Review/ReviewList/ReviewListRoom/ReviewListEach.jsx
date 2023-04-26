import styled from 'styled-components';

import ReviewListEachImage from './ReviewListEachImage';

import useGetReviewDetailQuery from '../../ReviewDetail/useGetReviewDetailQuery';
import {useEffect, useState} from 'react';
import RateStars from '../../Common/RateStars/RateStars';
import {useRef} from 'react';
import {clickedIdAtom} from './store';
import {useAtom} from 'jotai';

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

  // 클릭되면 표시되기

  const [clickedId, setClickedId] = useAtom(clickedIdAtom);
  const [isGlow, setIsGlow] = useState(false);

  useEffect(() => {
    if (clickedId === data.reviewId) {
      setIsGlow(true);
    } else {
      setIsGlow(false);
    }
  }, [clickedId]);

  const [id, setId] = useState(undefined);

  useEffect(() => {
    setId(data.reviewId);
  }, [data.reviewId]);

  useEffect(() => {
    // console.log('데이터여');
    // console.log(data);
  }, [data]);

  const {reviewDetailQueryRefetch} = useGetReviewDetailQuery(
    ['getReviewDetail'],

    `makers/reviews/detail?reviewId=${id}`,
  );

  const handleClick = () => {
    reviewDetailQueryRefetch();
    setClickedId(data.reviewId);
  };

  return (
    <Container isGlow={isGlow} onClick={handleClick}>
      <Wrap1>
        <Wrap3>
          <Wrap5>
            <OrderItemName>{data.orderItemName}</OrderItemName>

            <ContentDiv>
              <Content>{data.content}</Content>
            </ContentDiv>
          </Wrap5>

          <Writer>{data.writer}</Writer>
        </Wrap3>

        <ReviewListEachImage url={data.imageLocation && data.imageLocation} />
      </Wrap1>

      <Wrap2>
        <RateStars
          ratingInput={data.satisfaction}
          width={'80px'}
          margin={'1px'}
        />

        <Wrap4>
          {data.isMakersComments && (
            <IsMakersCommentsTrueSpan>답변 완료</IsMakersCommentsTrueSpan>
          )}
          {data.isReport && <ReportSpan>신고 리뷰</ReportSpan>}

          <CreateDate>{data.createDate}</CreateDate>
        </Wrap4>
      </Wrap2>
    </Container>
  );
};

export default ReviewListEach;

const Container = styled.div`
  border: ${({isGlow}) =>
    isGlow ? '2px solid rgb(97, 166, 195)' : '1px solid #a5a5a5;'};
  display: flex;

  flex-direction: column;
  justify-content: space-between;

  cursor: pointer;

  margin-bottom: 10px;
  border-radius: 8px;
  padding: 12px;
  background-color: #fff;

  min-height: 160px;
`;

const Wrap1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  margin-bottom: 6px;
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Wrap3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Wrap4 = styled.div``;
const Wrap5 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OrderItemName = styled.span`
  font-size: 16px;
  font-weight: 600;
  /* margin-bottom: 3px; */
  margin-right: 8px;
`;

const ContentDiv = styled.div`
  width: 260px;

  padding: 10px 6px;
`;

const Content = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Writer = styled.span`
  margin-bottom: 4px;
  padding-left: 2px;
`;

const CreateDate = styled.span``;

const ReportSpan = styled.span`
  display: inline-block;

  background-color: #cacaca;
  border-radius: 4px;

  align-items: center;
  padding: 0 13px;
  text-align: center;
  color: #ca2f2f;
  font-size: smaller;
  margin-right: 10px;
`;
const IsMakersCommentsTrueSpan = styled.span`
  display: inline-block;

  background-color: #cacaca;

  border-radius: 4px;

  align-items: center;
  padding: 0 13px;
  text-align: center;
  color: #4472c4;
  font-size: smaller;
  margin-right: 8px;
`;
