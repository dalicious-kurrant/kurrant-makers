import styled from 'styled-components';
import useGetReviewDetailQuery from './useGetReviewDetailQuery';
import {useEffect} from 'react';
import {reviewDetailAtom} from './store';
import {useAtom} from 'jotai';

const ReviewDetail = () => {
  // const {reviewDetail} = useGetReviewDetailQuery(
  //   ['getReviewDetail'],

  //   `makers/reviews/detail?reviewId=11`,
  // );
  const [reviewDetail, setReviewDetail] = useAtom(reviewDetailAtom);

  useEffect(() => {
    console.log('잘 들어오고있다');
    console.log(reviewDetail);
  }, [reviewDetail]);

  return (
    <Container>
      <Wrap1>
        <Title>리뷰 내용</Title>

        <Input
          disabled={true}
          // placeholder={disabled ? '(댓글없음)' : '댓글을 작성해주세요'}
          // onChange={handleChange}
          value={reviewDetail.content ? reviewDetail.content : '(리뷰 글 없음)'}
        />
      </Wrap1>

      <ImageListWrap></ImageListWrap>

      <Wrap1>
        <Title>리뷰 내용</Title>

        <Input
          disabled={true}
          // placeholder={disabled ? '(댓글없음)' : '댓글을 작성해주세요'}
          // onChange={handleChange}
          value={reviewDetail.content ? reviewDetail.content : '(리뷰 글 없음)'}
        />
      </Wrap1>
    </Container>
  );
};

export default ReviewDetail;

const Container = styled.div`
  border: 1px solid black;
  height: 100%;
  flex: 7;

  padding: 20px 16px;

  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  width: 90%;

  height: 90%;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;

  /* &:disabled {
    background: #ccc;
  } */

  background-color: #fff;
  color: #000;
  border: 1px solid #000;

  &:disabled {
    background-color: #fff;
    color: #888;
    border: 1px solid #000;
  }
`;

const Wrap1 = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
`;
const Title = styled.span``;
const ImageListWrap = styled.div``;
