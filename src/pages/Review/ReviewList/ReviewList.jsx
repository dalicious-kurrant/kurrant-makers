import {useEffect, useState} from 'react';
import styled from 'styled-components';

import useGetReviewQuery from './useGetReviewQuery';

const ReviewList = () => {
  const [orderItemNameAndCode, setOrderItemNameAndCode] = useState('');

  useEffect(() => {
    console.log(orderItemNameAndCode);
  }, [orderItemNameAndCode]);

  // const {unansweredList} = useUnansweredQuery(
  //   ['getUnansweredReviewList'],
  //   `makers/reviews/pending?limit=2&page=1`,
  // );
  // const {everyList} = useEveryListQuery(
  //   ['getEveryReviewList'],
  //   `makers/reviews/all?limit=2&page=1`,
  // );
  const {
    reviewList,
    unansweredTotalPage,
    everyListTotalPage,
    unansweredQueryRefetch,
    eveyListQueryRefetch,
  } = useGetReviewQuery(
    [['getUnansweredReviewList'], `makers/reviews/pending?limit=2&page=1`],
    [['getEveryReviewList'], `makers/reviews/all?limit=2&page=1`],
  );

  const handleNameFilter = e => {
    setOrderItemNameAndCode(e.target.value);
  };

  useEffect(() => {
    console.log(reviewList);
  }, [reviewList]);

  return (
    <Container>
      <Header>
        <TwoButtonWrap>
          <TwoButton bgColor={'#deb832'}>미답변 리뷰 보기</TwoButton>
          <TwoButton bgColor={'#4472C4'}>전체 리스트 보기</TwoButton>
        </TwoButtonWrap>

        <SearchWrap>
          <TextInput
            placeholder="상품명, 상품번호 검색"
            name="nameFilter"
            //   value={nameFilter}
            onChange={handleNameFilter}
          />

          <SearchButton bgColor={'#4472C4'}>상품 검색</SearchButton>
        </SearchWrap>
      </Header>

      <ReviewListWrap></ReviewListWrap>

      <PaginationWrap></PaginationWrap>
    </Container>
  );
};

export default ReviewList;

const Container = styled.div`
  border: 1px solid black;
  height: 100%;
  flex: 4;
`;

const Header = styled.div`
  width: 100%;
  padding: 30px 20px;
`;
const ReviewListWrap = styled.div``;
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
