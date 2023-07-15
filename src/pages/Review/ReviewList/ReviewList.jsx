import {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import useGetReviewQuery from './useGetReviewQuery';
import ReviewListRoom from './ReviewListRoom/ReviewListRoom';
import {buildCustomUrl} from './ReviewLogic';
import ReviewPagination from './ReviewPagination/ReviewPagination';
import {unansweredOrTotalAtom} from './store';
import {useAtom} from 'jotai';
import KeyDetector from '../../../utils/KeyDetector/KeyDetector';
import {Button} from 'semantic-ui-react';

const ReviewList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPage, setTotalPage] = useState(1);

  const [foodNameInput, setFoodNameInput] = useState('');

  const [focus, setFocus] = useState(0);

  // 버튼 누른 상태 보이게 하기 false -> 미답변 리뷰 보기, true -> 전체 리스트 보기
  const [unansweredOrTotal, setUnansweredOrTotal] = useAtom(
    unansweredOrTotalAtom,
  );

  const [allUrl, setAllUrl] = useState('makers/reviews/all?limit=50&page=1');
  const [unansweredUrl, setUnansweredUrl] = useState(
    'makers/reviews/pending?limit=50&page=1',
  );

  const {
    reviewList,
    unansweredTotalPage,
    allListTotalPage,
    unansweredTotalCount,
    allTotalCount,
    unansweredQueryRefetch,
    allListQueryRefetch,
  } = useGetReviewQuery(
    [['getUnansweredReviewList'], unansweredUrl],
    [['getEveryReviewList'], allUrl],
  );

  // pagination토탈페이지
  useEffect(() => {
    if (!unansweredOrTotal) {
      // 미답변
      setTotalPage(unansweredTotalPage);
    } else {
      setTotalPage(allListTotalPage);
    }
  }, [unansweredOrTotal, unansweredTotalPage, allListTotalPage]);

  useEffect(() => {
    setUnansweredUrl(buildCustomUrl('unanswered', limit, page, foodNameInput));
    setAllUrl(buildCustomUrl('total', limit, page, foodNameInput));
  }, [setAllUrl, setUnansweredUrl, foodNameInput, limit, page]);

  // 페이지네이션 숫자가 바뀔떄 리펫치 하기하기

  // 리미트 페이지가 바뀔때는 뭔가 값

  const [isLimitPageEdited, setIsLimitPageEdited] = useState(false);

  useEffect(() => {
    setIsLimitPageEdited(true);
  }, [limit, page]);

  useEffect(() => {
    if (!isLimitPageEdited) return;

    if (!unansweredOrTotal) {
      unansweredQueryRefetch();
    } else {
      allListQueryRefetch();
    }
    setIsLimitPageEdited(false);
  }, [isLimitPageEdited]);

  const handleNameFilter = e => {
    setFoodNameInput(e.target.value);
  };

  const handleSearchButton = () => {
    if (!unansweredOrTotal) {
      // 미답변

      unansweredQueryRefetch();
    } else {
      allListQueryRefetch();
    }
  };

  const handleKeyDetector = keyValue => {
    if (keyValue === 'Enter') {
      if (!unansweredOrTotal) {
        unansweredQueryRefetch();
      } else {
        allListQueryRefetch();
      }
    }
  };

  return (
    <Container>
      <div>
        <h1>리뷰 관리</h1>
      </div>
      <Header>
        <TwoButtonWrap>
          <Button
            style={{
              backgroundColor: focus === 1 ? '#3C5897' : '#767676',
              color: 'white',
            }}
            onClick={() => {
              setFocus(1);
              unansweredQueryRefetch();
              setUnansweredOrTotal(false);
            }}>
            미답변보기 ({unansweredTotalCount})
          </Button>
          <Button
            style={{
              backgroundColor: focus === 0 ? '#3C5897' : '#767676',
              color: 'white',
              marginRight: 12,
            }}
            onClick={() => {
              setFocus(0);
              allListQueryRefetch();
              setUnansweredOrTotal(true);
            }}>
            전체보기 ({allTotalCount})
          </Button>
        </TwoButtonWrap>

        <SearchWrap>
          <TextInput
            style={{flex: 1}}
            placeholder="상품명, 상품번호 검색"
            name="nameFilter"
            //   value={nameFilter}
            onChange={handleNameFilter}
          />
          <Button
            onClick={handleSearchButton}
            content="상품검색"
            style={{
              backgroundColor: '#4484CA',
              color: 'white',
              fontWeight: 400,
            }}
          />
        </SearchWrap>
      </Header>

      <ReviewListWrap>
        {Array.isArray(reviewList) && reviewList.length > 0 ? (
          <ReviewListRoom reviewList={reviewList} />
        ) : (
          <PDiv>
            <P>
              {unansweredOrTotal
                ? '작성된 리뷰가 없습니다'
                : '미답변된 리뷰가 없습니다'}{' '}
            </P>
          </PDiv>
        )}
      </ReviewListWrap>

      <PaginationWrap>
        {reviewList && reviewList.length > 0 ? (
          <ReviewPagination
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            totalPage={totalPage}
            selectOptionArray={[50, 100, 200, 500]}
            // selectOptionArray={[1, 2, 4, 5]}
          />
        ) : (
          <Div></Div>
        )}
      </PaginationWrap>
      <KeyDetector sendKeyValue={handleKeyDetector} />
    </Container>
  );
};

export default ReviewList;

const Container = styled.div`
  flex: 6;
  margin-top: 80px;
  margin-left: 40px;
`;

const Header = styled.div`
  margin-top: 24px;
  display: flex;
`;
const ReviewListWrap = styled.div`
  height: 82%;
`;
const PaginationWrap = styled.div``;

const TwoButtonWrap = styled.div`
  display: flex;
`;

const SearchWrap = styled.div`
  display: flex;
  margin-left: 32px;
`;

const TextInput = styled.input`
  border: 0.5px solid #c8c8d2;
  border-radius: 8px;
  width: 232px;
  height: 41px;
  font-size: 12px;
  margin-right: 8px;
  padding-left: 16px;

  :focus {
    border: 0.5px solid #c8c8d2;
    outline: none;
  }

  ::placeholder {
    color: #c8c8d2;
    //padding-left: 8px;
  }
`;

const Div = styled.div``;

const PDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const P = styled.p``;
