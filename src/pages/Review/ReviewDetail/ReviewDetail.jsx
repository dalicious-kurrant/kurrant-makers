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

  const {reportReviewMutate, submitCommentMutate, editCommentMutate} =
    useReviewDetailMutation();

  const handleReport = () => {
    if (window.confirm('이 리뷰를 신고하시겠습니까?')) {
      if (reviewDetail && reviewDetail?.isReport) {
        window.confirm('이미 신고된 리뷰입니다');
        return;
      }
      if (reviewDetail && reviewDetail?.isDelete) {
        window.confirm('이미 삭제된 리뷰입니다');
        return;
      }
      reportReviewMutate({
        id: reviewDetail.reviewId,
      });

      // window.location.reload();
    } else {
      return;
    }
  };
  const handleSubmit = () => {
    if (window.confirm('사장님 댓글을 작성하시겠습니까?')) {
      if (reviewDetail && reviewDetail?.isDelete) {
        window.confirm('이미 삭제된 리뷰입니다');
      } else {
        if (
          reviewDetail.makersComment &&
          reviewDetail.makersComment.commentId
        ) {
          editCommentMutate({
            id: reviewDetail.makersComment.commentId,
            content: {
              content: value,
            },
          });
        } else {
          submitCommentMutate({
            content: value,
            id: reviewDetail.reviewId,
          });
        }
      }
    } else {
      return;
    }
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

      <NoticeWrap>
        <IsCommentP>
          {reviewDetail.makersComment && reviewDetail.makersComment.commentId
            ? '사장님 댓글이 있는 리뷰입니다.'
            : ' 댓글이 아직 없는 리뷰입니다.'}
        </IsCommentP>

        {reviewDetail.isReport && <ReportP>신고된 리뷰입니다</ReportP>}
      </NoticeWrap>

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
            <NoPhotosSpan> 등록된 리뷰 사진이 없습니다</NoPhotosSpan>
          </NoPhotosWrap>
        )}
      </ImageListWrap>

      <Wrap1>
        <Title>
          {reviewDetail.makersComment && reviewDetail.makersComment.commentId
            ? '댓글 수정'
            : ' 댓글 작성'}
        </Title>
        <Input disabled={false} onChange={handleChange} value={value} />
      </Wrap1>

      <ButtonWrap>
        <ReportBtn onClick={handleReport} bgColor={'#ca2f2f'}>
          리뷰 신고하기
        </ReportBtn>
        <SubmitCommentBtn onClick={handleSubmit} bgColor={'#4472C4'}>
          {reviewDetail.makersComment && reviewDetail.makersComment.commentId
            ? '댓글 수정하기'
            : ' 댓글 작성하기'}
        </SubmitCommentBtn>
      </ButtonWrap>
    </Container>
  );
};

export default ReviewDetail;

const Container = styled.div`
  /* border: 1px solid black; */
  height: 100%;
  flex: 7;

  padding: 20px 24px;

  display: flex;
  flex-direction: column;
`;

const NoticeWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 18px;
`;

const ReportP = styled.span`
  color: #ca2f2f;
  font-size: 18px;
  /* margin: 8px 0; */
`;
const IsCommentP = styled.span`
  color: #315cac;
  /* margin: 8px 0; */
  font-size: 18px;
  margin-right: 20px;
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
  font-size: 18px;
  &:disabled {
    background-color: #fff;
    color: #6c6c6c;
    border: 1px solid #888;
    /* border: 1px solid #000; */
  }
`;

const Wrap1 = styled.div`
  display: flex;
  flex-direction: column;
  height: 35%;

  /* border: 1px solid black; */

  margin-bottom: 10px;
`;
const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
`;
const ImageListWrap = styled.div`
  display: flex;
`;

const NoPhotosWrap = styled.div`
  height: 110px;
  padding: 24px 0;
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
