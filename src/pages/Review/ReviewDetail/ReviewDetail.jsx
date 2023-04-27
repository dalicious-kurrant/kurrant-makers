import styled from 'styled-components';
import useGetReviewDetailQuery from './useGetReviewDetailQuery';
import {useEffect, useState} from 'react';
import {reviewDetailAtom} from './store';
import {useAtom} from 'jotai';
import ReviewImage from './components/ReviewImage';
import ReviewImageModal from './ReviewImageModal/ReviewImageModal';
import useReviewDetailMutation from './useReviewDetailMutation';
import {useRef} from 'react';
import useWindowSizeChangeDetector from '../../../utils/useWindowSizeChangeDetector/useWindowSizeChangeDetector';

const ReviewDetail = () => {
  const [showImageModal, setShowImageModal] = useState(false);

  const [reviewDetail, UNAVAILABLE_HERE] = useAtom(reviewDetailAtom);

  const [value, setValue] = useState('');

  // inpu값의 width 알아내기

  const makersCommentRef = useRef(null);

  const [relativeFontSize, setRelativeFontSize] = useState(20);

  const {widthIsIncreasing, windowWidth} = useWindowSizeChangeDetector();

  const detectWidth = () => {
    let makersCurrent;
    let width;

    if (makersCommentRef.current) {
      makersCurrent = makersCommentRef.current;
      width =
        makersCurrent.getBoundingClientRect().right -
        makersCurrent.getBoundingClientRect().left;
    }

    setRelativeFontSize((2 / 39) * width);
  };

  useEffect(() => {
    detectWidth();
  }, [widthIsIncreasing, windowWidth]);

  //
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
    // console.log(reviewDetail);
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
            Array.isArray(reviewDetail.imageLocation) &&
            reviewDetail.imageLocation
          }
        />
      )}

      {Object.keys(reviewDetail).length > 0 ? (
        <BigDiv>
          {/* 2차 디자인 */}

          <VacentSpaceDiv />

          <ImageListWrap>
            {Array.isArray(reviewDetail.imageLocation) &&
            reviewDetail.imageLocation.length > 0 ? (
              reviewDetail.imageLocation.map((v, i) => {
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

          <ContentWrapper>
            <ReviewContentWrap>
              <TitleD2>리뷰 내용</TitleD2>

              <ContentInput
                relativeFontSize={relativeFontSize}
                disabled={true}
                value={
                  reviewDetail.content ? reviewDetail.content : '(리뷰 글 없음)'
                }
              />

              <BottomWrapD2>
                <BtnD2 onClick={handleReport} color={'#ca2f2f'}>
                  리뷰 신고하기
                </BtnD2>

                {reviewDetail.isReport && (
                  <ReportPD2>신고된 리뷰입니다</ReportPD2>
                )}
              </BottomWrapD2>
            </ReviewContentWrap>

            <MakersCommentWrap>
              <TitleD2>사장님 댓글</TitleD2>

              <ContentInput
                relativeFontSize={relativeFontSize}
                ref={makersCommentRef}
                disabled={false}
                onChange={handleChange}
                value={value}
              />

              <BottomWrapD2>
                <IsCommentPD2>
                  {reviewDetail.makersComment &&
                  reviewDetail.makersComment.commentId
                    ? '댓글 작성이 완료된 리뷰입니다.'
                    : ' 댓글이 아직 없는 리뷰입니다.'}
                </IsCommentPD2>

                <BtnD2 onClick={handleSubmit} color={'#4472C4'}>
                  {reviewDetail.makersComment &&
                  reviewDetail.makersComment.commentId
                    ? '댓글 수정하기'
                    : ' 댓글 작성하기'}
                </BtnD2>
              </BottomWrapD2>
            </MakersCommentWrap>
          </ContentWrapper>

          {/* 1차 디자인 */}
          <>
            {' '}
            {/* <NoticeWrap>
            <IsCommentP>
              {reviewDetail.makersComment &&
              reviewDetail.makersComment.commentId
                ? '사장님 댓글이 있는 리뷰입니다.'
                : ' 댓글이 아직 없는 리뷰입니다.'}
            </IsCommentP>

            {reviewDetail.isReport && <ReportP>신고된 리뷰입니다</ReportP>}
          </NoticeWrap>

          <Wrap1>
            <Title>리뷰 내용</Title>

            <Input
              disabled={true}
              value={
                reviewDetail.content ? reviewDetail.content : '(리뷰 글 없음)'
              }
            />
          </Wrap1>

          <ImageListWrap>
            {Array.isArray(reviewDetail.imageLocation) &&
            reviewDetail.imageLocation.length > 0 ? (
              reviewDetail.imageLocation.map((v, i) => {
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
              {reviewDetail.makersComment &&
              reviewDetail.makersComment.commentId
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
              {reviewDetail.makersComment &&
              reviewDetail.makersComment.commentId
                ? '댓글 수정하기'
                : ' 댓글 작성하기'}
            </SubmitCommentBtn>
          </ButtonWrap> */}
          </>
        </BigDiv>
      ) : (
        <NoDetailDiv>
          <NoDetailP>관리할 리뷰를 왼쪽에서 골라 클릭해주세요</NoDetailP>
        </NoDetailDiv>
      )}
    </Container>
  );
};

export default ReviewDetail;

const Container = styled.section`
  /* border: 1px solid black; */
  height: 100%;
  flex: 7;

  padding: 20px 24px;

  display: flex;
  flex-direction: column;
  background-color: #d9d9d9;
`;

const BigDiv = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

// 2차 디자인

const VacentSpaceDiv = styled.div`
  flex: 9;
`;

const ContentWrapper = styled.div`
  flex: 10;
  display: flex;
`;

const ReviewContentWrap = styled.div`
  flex: 1;

  padding-right: 10px;
`;
const MakersCommentWrap = styled.div`
  flex: 1;

  padding-left: 10px;
`;

const TitleD2 = styled.h3`
  font-size: 20px;
  margin: 0;
  /* margin-bottom: 20px; */
`;
const ContentInput = styled.textarea`
  width: 100%;

  height: 80%;
  border-radius: 10px;

  padding: 14px 6px;

  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  font-size: ${({relativeFontSize}) => `${relativeFontSize}px`};

  font-family: 'Pretendard-Regular';
  &:disabled {
    background-color: #fff;
    color: #6c6c6c;
    border: 1px solid #888;
    /* border: 1px solid #000; */
  }
  &:focus {
  }
  resize: none;
`;

const BottomWrapD2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
`;

const BtnD2 = styled.button`
  outline: 0;
  cursor: pointer;
  border: 0;
  padding: 4px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  margin-right: 30px;

  background-color: #bfbfbf;
  color: ${({color}) => color};
`;

const ImageListWrap = styled.div`
  display: flex;
  flex: 1;

  min-height: 130px;
`;

const NoPhotosWrap = styled.div`
  height: 110px;
  padding: 24px 0;
`;

const NoPhotosSpan = styled.span`
  font-size: 26px;
`;

const ReportPD2 = styled.span`
  color: #ca2f2f;
  font-size: 14px;
  /* margin: 8px 0; */
`;

const IsCommentPD2 = styled.span`
  color: #315cac;
  /* margin: 8px 0; */
  font-size: 14px;
  margin-right: 20px;
`;

const NoDetailDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;
const NoDetailP = styled.p`
  font-size: 20px;
`;

/////////////////////
// 1차 디자인

// const NoDetailDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   height: 100%;
//   width: 100%;
// `;
// const NoDetailP = styled.p`
//   font-size: 20px;
// `;

// const NoticeWrap = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;

//   margin-bottom: 18px;
// `;

// const ReportP = styled.span`
//   color: #ca2f2f;
//   font-size: 18px;
//   /* margin: 8px 0; */
// `;
// const IsCommentP = styled.span`
//   color: #315cac;
//   /* margin: 8px 0; */
//   font-size: 18px;
//   margin-right: 20px;
// `;

// const Input = styled.textarea`
//   width: 100%;

//   height: 90%;
//   border-radius: 10px;
//   margin-bottom: 20px;
//   padding: 20px;

//   background-color: #fff;
//   color: #000;
//   border: 1px solid #000;
//   font-size: 18px;
//   &:disabled {
//     background-color: #fff;
//     color: #6c6c6c;
//     border: 1px solid #888;
//     /* border: 1px solid #000; */
//   }
// `;

// const Wrap1 = styled.div`
//   display: flex;
//   font-size: 15px;
//   flex-direction: column;
//   height: 35%;

//   /* border: 1px solid black; */

//   margin-bottom: 10px;
// `;
// const Title = styled.h3`
//   font-size: 20px;
//   margin-bottom: 20px;
// `;

// const ImageListWrap = styled.div`
//   display: flex;
//   flex: 1;
// `;

// const NoPhotosWrap = styled.div`
//   height: 110px;
//   padding: 24px 0;
// `;

// const NoPhotosSpan = styled.span`
//   font-size: 26px;
// `;

// const ButtonWrap = styled.div`
//   display: flex;
//   font-size: 15px;
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
// `;
// const ReportBtn = styled.button`
//   outline: 0;
//   cursor: pointer;
//   border: 0;
//   padding: 11px;
//   padding-left: 20px;
//   padding-right: 20px;
//   font-size: 15px;
//   font-weight: 600;
//   border-radius: 10px;
//   margin-right: 30px;

//   background-color: ${({bgColor}) => bgColor};
//   color: white;
// `;
// const SubmitCommentBtn = styled.button`
//   outline: 0;
//   cursor: pointer;
//   border: 0;
//   padding: 11px;
//   padding-left: 20px;
//   font-weight: 600;
//   padding-right: 20px;
//   font-size: 15px;
//   border-radius: 10px;

//   background-color: ${({bgColor}) => bgColor};
//   color: white;
// `;
