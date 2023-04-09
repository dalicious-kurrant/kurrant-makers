import {useMutation, useQueryClient} from 'react-query';
import instance from '../../../Shared/axios';

const useReviewDetailMutation = () => {
  const queryClient = useQueryClient();

  // 리뷰신고

  const {mutate: reportReviewMutate} = useMutation(
    async data => {
      const response = await instance.patch(`makers/reviews/report`, data);

      return response;
    },
    {
      onSuccess: () => {
        console.log('리뷰 신고 success');
        queryClient.invalidateQueries(['getReviewDetail']);
        queryClient.invalidateQueries('getReviewDetail');
        // queryClient.invalidateQueries(['getReviewList']);
        window.confirm('리뷰 신고가 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('리뷰 신고 실패');
      },
    },
  );

  // 운영팀 댓글 작성

  const {mutate: submitCommentMutate} = useMutation(
    async data => {
      console.log(data);

      const response = await instance.post(
        `makers/reviews/comment?reviewId=${data.id}`,
        data,
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('운영자 댓글 작성 success');

        queryClient.invalidateQueries('getReviewDetail');
        // queryClient.invalidateQueries(['getReviewList']);
        window.confirm('운영자 리뷰 작성이 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('운영자 댓글 작성 실패');
      },
    },
  );

  return {
    reportReviewMutate,
    submitCommentMutate,
  };
};
export default useReviewDetailMutation;
