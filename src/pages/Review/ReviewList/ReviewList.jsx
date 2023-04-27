import {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import useGetReviewQuery from './useGetReviewQuery';
import ReviewListRoom from './ReviewListRoom/ReviewListRoom';
import {buildCustomUrl} from './ReviewLogic';
import ReviewPagination from './ReviewPagination/ReviewPagination';
import {unansweredOrTotalAtom} from './store';
import {useAtom} from 'jotai';
import KeyDetector from '../../../utils/KeyDetector/KeyDetector';

const ReviewList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [totalPage, setTotalPage] = useState(1);

  const [foodNameInput, setFoodNameInput] = useState('');

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
    unansweredQueryRefetch,
    allListQueryRefetch,
  } = useGetReviewQuery(
    [['getUnansweredReviewList'], unansweredUrl],
    [['getEveryReviewList'], allUrl],
  );

  // useEffect(() => {
  //   console.log('여여여여여');
  //   console.log(unansweredTotalPage);
  //   console.log(allListTotalPage);
  // }, [unansweredTotalPage, allListTotalPage]);

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

  // 타이핑만 하면 자동으로 리펫치하기
  // useEffect(() => {
  //   // 미답변일떄 false일때만 리펫치 하게끔 하기
  //   if (!unansweredOrTotal) {
  //     unansweredQueryRefetch();
  //   }
  // }, [unansweredUrl]);

  // useEffect(() => {
  //   if (unansweredOrTotal) {
  //     allListQueryRefetch();
  //   }
  // }, [allUrl]);

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

  // 값 확인하기
  // useEffect(() => {
  //   if (!unansweredOrTotal) {
  //     console.log(unansweredUrl);
  //   } else {
  //     console.log(allUrl);
  //   }

  //   console.log('page ' + page);
  //   console.log('limit ' + limit);
  //   console.log('totalPage ' + totalPage);
  // }, [allUrl, unansweredUrl, totalPage]);

  // useEffect(() => {
  //   console.log(foodNameInput);
  // }, [foodNameInput]);

  // useEffect(() => {
  //   console.log(reviewList);
  // }, [reviewList]);

  const handleKeyDetector = keyValue => {
    if (keyValue === 'Enter') {
      if (!unansweredOrTotal) {
        unansweredQueryRefetch();
      } else {
        allListQueryRefetch();
      }
    }
  };

  ////////

  return (
    <Container>
      <Header>
        <Wrap1>
          <TwoButtonWrap>
            <TwoButton
              count={1}
              // unansweredOrTotal={!unansweredOrTotal}
              onClick={() => {
                unansweredQueryRefetch();
                setUnansweredOrTotal(false);
              }}>
              미답변 리뷰 보기 ({1})
            </TwoButton>
            <TwoButton
              count={2}
              // unansweredOrTotal={unansweredOrTotal}
              onClick={() => {
                allListQueryRefetch();
                setUnansweredOrTotal(true);
              }}>
              전체 리스트 보기 ({1})
            </TwoButton>
          </TwoButtonWrap>

          <BottomBarDiv unansweredOrTotal={unansweredOrTotal}>
            <BottomBar />
          </BottomBarDiv>
        </Wrap1>

        <SearchWrap>
          <TextInput
            style={{flex: 1}}
            placeholder="상품명, 상품번호 검색"
            name="nameFilter"
            //   value={nameFilter}
            onChange={handleNameFilter}
          />

          <SearchButton onClick={handleSearchButton} bgColor={'#4472C4'}>
            {/* <SearchButton onClick={handleSearchButton} bgColor={'#c2c2c2'}> */}
            상품 검색
          </SearchButton>
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
  /* border: 1px solid black; */
  height: 100%;
  flex: 4;
  background-color: #eaeaea;
`;

const Header = styled.div`
  width: 100%;
  /* padding: 30px 20px; */
  padding: 10px 10px;
  padding-bottom: 20px;
  /* height: 19%; */
  /* border: 1px solid black; */
`;
const ReviewListWrap = styled.div`
  height: 82%;
  /* flex: 1; */

  /* margin-bottom: 10px; */
`;
const PaginationWrap = styled.div`
  /* height: 5%; */
  /* border: 1px solid black; */
`;

const Wrap1 = styled.div`
  margin-bottom: 18px;
`;
const TwoButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
`;

const TwoButton = styled.button`
  outline: 0;
  cursor: pointer;
  border: 0;
  /* 
  height: 30px; */
  /* width: 180px; */
  width: 49.8%;
  /* width: 50%; */
  height: 26px;
  font-size: 14px;
  border-radius: 10px 10px 0 0;
  padding: 4px;

  background-color: #c2c2c2;

  ${({count}) => {
    if (count === 1) {
      return css`
        /* border-right: 1px solid #232323; */
        /* border: 1px solid #232323; */
      `;
    } else {
      return css`
        /* border-left: 1px solid #8d8d8d; */
      `;
    }
  }}

  color: #2f2f2f;
`;

const BottomBarDiv = styled.div`
  width: 100%;
  height: 6px;

  display: flex;

  transition: all 0.5s;
  flex-direction: ${({unansweredOrTotal}) =>
    !unansweredOrTotal ? 'row' : 'row-reverse'};

  /* ; */
`;

const BottomBar = styled.div`
  width: 49.8%;
  /* width: 50%; */
  height: 100%;
  background-color: #020046;
`;
const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
`;

const TextInput = styled.input`
  margin-left: 10px;
  border: none;
  border-radius: 3px;
  height: 22px;
  padding-left: 2px;
  font-size: 12px;

  :focus {
    border: none;
    outline: none;
  }
`;

const SearchButton = styled.button`
  outline: 0;
  cursor: pointer;
  border: 0;
  width: 100px;
  height: 22px;
  font-size: 12px;
  border-radius: 10px;

  background-color: ${({bgColor}) => bgColor};
  /* color: #2f2f2f; */
  color: #ffffff;
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
