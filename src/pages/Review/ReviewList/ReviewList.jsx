import {useEffect, useState} from 'react';
import styled from 'styled-components';

import useGetReviewQuery from './useGetReviewQuery';
import ReviewListRoom from './ReviewListRoom/ReviewListRoom';
import {buildCustomUrl} from './ReviewLogic';

const ReviewList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const [foodNameInput, setFoodNameInput] = useState('');

  // 버튼 누른 상태 보이게 하기 false -> 미답변 리뷰 보기, true -> 전체 리스트 보기
  const [unansweredOrTotal, setUnansweredOrTotal] = useState(false);

  const [totalUrl, setTotalUrl] = useState(
    'makers/reviews/all?limit=50&page=1',
  );
  const [unansweredUrl, setUnansweredUrl] = useState(
    'makers/reviews/pending?limit=50&page=1',
  );

  const {
    reviewList,
    unansweredTotalPage,
    everyListTotalPage,
    unansweredQueryRefetch,
    everyListQueryRefetch,
  } = useGetReviewQuery(
    [['getUnansweredReviewList'], unansweredUrl],
    [['getEveryReviewList'], totalUrl],
  );

  useEffect(() => {
    setUnansweredUrl(buildCustomUrl('unanswered', limit, page, foodNameInput));
    setTotalUrl(buildCustomUrl('total', limit, page, foodNameInput));
  }, [setTotalUrl, setUnansweredUrl, foodNameInput]);

  useEffect(() => {
    // 미답변일떄 false일때만 리펫치 하게끔 하기
    if (!unansweredOrTotal) {
      unansweredQueryRefetch();
    }
  }, [unansweredUrl]);

  useEffect(() => {
    if (unansweredOrTotal) {
      everyListQueryRefetch();
    }
  }, [totalUrl]);

  const handleNameFilter = e => {
    setFoodNameInput(e.target.value);
  };

  const handleSearchButton = () => {
    if (!unansweredOrTotal) {
      // 미답변

      unansweredQueryRefetch();
    } else {
      everyListQueryRefetch();
    }
  };

  // 값 확인하기
  useEffect(() => {
    console.log(foodNameInput);
  }, [foodNameInput]);

  //////// 채팅방 코드

  return (
    <Container>
      <Header>
        <TwoButtonWrap>
          <TwoButton
            unansweredOrTotal={!unansweredOrTotal}
            onClick={() => {
              unansweredQueryRefetch();
              setUnansweredOrTotal(false);
            }}
            bgColor={'#deb832'}>
            미답변 리뷰 보기
          </TwoButton>
          <TwoButton
            unansweredOrTotal={unansweredOrTotal}
            onClick={() => {
              everyListQueryRefetch();
              setUnansweredOrTotal(true);
            }}
            bgColor={'#4472C4'}>
            전체 리스트 보기
          </TwoButton>
        </TwoButtonWrap>

        <SearchWrap>
          <TextInput
            placeholder="상품명, 상품번호 검색"
            name="nameFilter"
            //   value={nameFilter}
            onChange={handleNameFilter}
          />

          <SearchButton onClick={handleSearchButton} bgColor={'#4472C4'}>
            상품 검색
          </SearchButton>
        </SearchWrap>
      </Header>

      <ReviewListWrap>
        {Array.isArray(reviewList) && reviewList.length > 0 ? (
          <ReviewListRoom reviewList={reviewList} />
        ) : (
          <>
            <p>리뷰 리스트에 암것도 없는데요?</p>
          </>
        )}
      </ReviewListWrap>

      <PaginationWrap></PaginationWrap>
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
  padding: 30px 20px;
`;
const ReviewListWrap = styled.div`
  height: 66%;
`;
const PaginationWrap = styled.div``;

const TwoButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0px 5px; */
`;

const TwoButton = styled.button`
  outline: 0;
  cursor: pointer;
  border: 0;
  /* width: 47%;
  height: 30px; */
  width: 180px;
  height: 34px;
  font-size: 18px;
  border-radius: 10px;
  padding: 4px;
  background-color: ${({bgColor}) => bgColor};
  color: white;

  ${({unansweredOrTotal}) => {
    if (unansweredOrTotal) {
      return ` border: 5px solid rgb(220, 21, 210)`;
      // return ` outline: thick solid #00ff00"`;
    }
  }};

  /* box-shadow: 5px 5px 5px 5px hotpink; */
  /* box-shadow: 6px 4px 201px 14px rgba(8, 102, 245, 1);
  -webkit-box-shadow: 6px 4px 201px 14px rgba(8, 102, 245, 1);
  -moz-box-shadow: 6px 4px 201px 14px rgba(8, 102, 245, 1); */
`;

const SearchButton = styled.button`
  outline: 0;
  cursor: pointer;
  border: 0;
  width: 180px;
  height: 34px;
  font-size: 18px;
  border-radius: 10px;
  /* padding: 4px; */
  background-color: ${({bgColor}) => bgColor};
  color: white;
`;

const TextInput = styled.input`
  margin-left: 10px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  height: 32px;
  padding-left: 8px;
`;
