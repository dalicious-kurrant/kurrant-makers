import styled from 'styled-components';
import useGetReviewDetailQuery from './useGetReviewDetailQuery';
import {useEffect, useState} from 'react';
import {reviewDetailAtom} from './store';
import {useAtom} from 'jotai';
import ReviewImage from './components/ReviewImage';
import ReviewImageModal from './ReviewImageModal/ReviewImageModal';
import useReviewDetailMutation from './useReviewDetailMutation';

const ReviewDetail = () => {
  const [showImageModal, setShowImageModal] = useState(false);

  const [reviewDetail, UNAVAILABLE_HERE] = useAtom(reviewDetailAtom);

  const [value, setValue] = useState('');

  useEffect(() => {
    if (reviewDetail.makersComment && reviewDetail.makersComment.commentId) {
      setValue(reviewDetail.makersComment.content);
    } else {
      setValue('');
    }
  }, [reviewDetail.makersComment]);

  const {reportReviewMutate, submitCommentMutate} = useReviewDetailMutation();

  const handleReport = () => {
    reportReviewMutate({
      id: reviewDetail.reviewId,
    });
  };
  const handleSubmit = () => {
    // 리뷰 작성이냐 수정이냐 나눠야됨

    submitCommentMutate({
      content: value,
      id: reviewDetail.reviewId,
    });
  };

  useEffect(() => {
    // console.log('잘 들어오고있다');
    console.log(reviewDetail);
  }, [reviewDetail]);

  // 내용 없을때

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <Container>
      {showImageModal && (
        <ReviewImageModal
          open={showImageModal}
          setOpen={setShowImageModal}
          imgArray={
            Array.isArray(reviewDetail.imageLocations) &&
            reviewDetail.imageLocations
          }
        />
      )}

      {reviewDetail.isReport && <ReportP>신고된 리뷰입니다</ReportP>}

      <IsCommentP>
        {reviewDetail.makersComment && reviewDetail.makersComment.commentId
          ? '사장님 댓글이 있는 리뷰입니다.'
          : ' 댓글이 아직 없는 리뷰입니다.'}
      </IsCommentP>

      <Wrap1>
        <Title>리뷰 내용</Title>

        <Input
          disabled={true}
          value={reviewDetail.content ? reviewDetail.content : '(리뷰 글 없음)'}
        />
      </Wrap1>

      <ImageListWrap>
        {Array.isArray(reviewDetail.imageLocations) &&
        reviewDetail.imageLocations.length > 0 ? (
          reviewDetail.imageLocations.map((v, i) => {
            return (
              <ReviewImage
                key={i}
                url={v}
                setShowImageModal={setShowImageModal}
              />
            );
          })
        ) : (
          <NoPhotosWrap>
            <NoPhotosSpan> 등록된 리뷰 사진은 없어요</NoPhotosSpan>
          </NoPhotosWrap>
        )}
      </ImageListWrap>

      <Wrap1>
        <Title>댓글 작성</Title>
        <Input disabled={false} onChange={handleChange} value={value} />
      </Wrap1>

      <ButtonWrap>
        <ReportBtn onClick={handleReport} bgColor={'#ca2f2f'}>
          리뷰 신고하기
        </ReportBtn>
        <SubmitCommentBtn onClick={handleSubmit} bgColor={'#4472C4'}>
          댓글 작성하기
        </SubmitCommentBtn>
      </ButtonWrap>
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

const ReportP = styled.p`
  color: #ca2f2f;
  font-size: 16px;
  margin: 8px 0;
`;
const IsCommentP = styled.p`
  color: #ca2f2f;
  margin: 8px 0;
  font-size: 16px;
`;

const Input = styled.textarea`
  width: 100%;

  height: 90%;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;

  background-color: #fff;
  color: #000;
  border: 1px solid #000;

  &:disabled {
    background-color: #fff;
    color: #888;
    border: 1px solid #888;
    /* border: 1px solid #000; */
  }
`;

const Wrap1 = styled.div`
  display: flex;
  flex-direction: column;
  height: 35%;
`;
const Title = styled.span`
  font-size: 20px;
  margin-bottom: 20px;
`;
const ImageListWrap = styled.div`
  display: flex;
`;

const NoPhotosWrap = styled.div`
  height: 110px;
  padding: 24px 12px;
`;

const NoPhotosSpan = styled.span`
  font-size: 26px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const ReportBtn = styled.button`
  outline: 0;
  cursor: pointer;
  border: 0;
  width: 180px;
  height: 34px;
  font-size: 18px;
  border-radius: 10px;
  margin-right: 30px;

  background-color: ${({bgColor}) => bgColor};
  color: white;
`;
const SubmitCommentBtn = styled.button`
  outline: 0;
  cursor: pointer;
  border: 0;
  width: 180px;
  height: 34px;
  font-size: 18px;
  border-radius: 10px;

  background-color: ${({bgColor}) => bgColor};
  color: white;
`;
