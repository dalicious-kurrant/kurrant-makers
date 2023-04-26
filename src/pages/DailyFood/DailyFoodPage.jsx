/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {useGetDailyFoodList} from '../../hook/useDailyFoods';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import {formattedWeekDate, formattedWeekDateZ} from '../../utils/dateFormatter';
import {diningFormatted} from '../../utils/statusFormatter';
import withCommas from '../../utils/withCommas';

const DailyFoodPage = () => {
  const currentDay = new Date();
  const now = new Date();
  const nowDayOfWeek = now.getDay();
  const nowDay = now.getDate();
  const nowMonth = now.getMonth();
  let nowYear = now.getYear();
  nowYear += nowYear < 2000 ? 1900 : 0;
  const weekStartDate = new Date(
    nowYear,
    nowMonth,
    nowDay - (nowDayOfWeek - 1),
  );
  const weekEndDate = new Date(
    nowYear,
    nowMonth,
    nowDay + (6 - nowDayOfWeek - 1),
  );
  // const days = formattedWeekDate(day.setDate(new Date().getDate() + 7));
  const [startDate, setStartDate] = useState(formattedWeekDateZ(weekStartDate));
  const [endDate, setEndDate] = useState(formattedWeekDateZ(weekEndDate));
  const {
    data: dailyfoodsList,
    isFetching,
    refetch,
  } = useGetDailyFoodList(startDate, endDate);
  const getStartDate = e => {
    setStartDate(formattedWeekDateZ(e.target.value));
  };
  const getEndDate = e => {
    setEndDate(formattedWeekDateZ(e.target.value));
  };
  useEffect(() => {
    refetch();
  }, [startDate, endDate]);

  return (
    <Wrap>
      <h1>식단 조회</h1>
      <CalendarWrap>
        <div>
          <DateInput
            type="date"
            value={startDate}
            // defaultValue={startDate}
            onChange={e => getStartDate(e)}
          />
          <DateSpan>-</DateSpan>
          <DateInput
            type="date"
            value={endDate}
            // defaultValue={endDate}
            onChange={e => getEndDate(e)}
          />
        </div>
        <ButtonWrap>
          <Button
            content="이번주"
            basic
            size="tiny"
            onClick={() => {
              const weekStartDate = new Date(
                nowYear,
                nowMonth,
                nowDay - (nowDayOfWeek - 1),
              );
              const weekEndDate = new Date(
                nowYear,
                nowMonth,
                nowDay + (6 - nowDayOfWeek - 1),
              );
              setStartDate(formattedWeekDateZ(weekStartDate));
              setEndDate(formattedWeekDateZ(weekEndDate));
            }}
          />
          <Button
            content="다음주"
            basic
            size="tiny"
            onClick={() => {
              const weekStartDate = new Date(
                nowYear,
                nowMonth,
                nowDay - (nowDayOfWeek - 1) + 7,
              );
              const weekEndDate = new Date(
                nowYear,
                nowMonth,
                nowDay + (6 - nowDayOfWeek - 1) + 7,
              );
              setStartDate(formattedWeekDateZ(weekStartDate));
              setEndDate(formattedWeekDateZ(weekEndDate));
            }}
          />
        </ButtonWrap>
      </CalendarWrap>
      {isFetching ? (
        <PageWrapper>
          <div>로딩중</div>
        </PageWrapper>
      ) : (
        <TableWrapper>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  다이닝 타입
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <div style={{width: 100}}>노출 고객</div>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <div style={{width: 300}}>상품</div>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <div style={{width: 130}}>최대 상품 제작 가능 수</div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dailyfoodsList?.data?.data?.map((el, idx) => {
                return el.dailyFoodDiningList.map(v => {
                  return v.dailyFoodList.map((food, i) => {
                    if (i === 0) {
                      return (
                        <Table.Row
                          key={`${
                            v.diningType + v.groupCapacity + food.foodName
                          }`}>
                          <Table.Cell
                            textAlign="center"
                            rowSpan={v.dailyFoodList.length}>
                            {el.serviceDate}
                          </Table.Cell>
                          <Table.Cell
                            textAlign="center"
                            rowSpan={v.dailyFoodList.length}>
                            {diningFormatted(v.diningType)}
                          </Table.Cell>
                          <Table.Cell
                            textAlign="center"
                            rowSpan={v.dailyFoodList.length}>
                            {withCommas(v.groupCapacity)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            <FoodBox>{food.foodName}</FoodBox>
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            <FoodBox>{withCommas(food.foodCapacity)}</FoodBox>
                          </Table.Cell>
                        </Table.Row>
                      );
                    } else {
                      return (
                        <Table.Row
                          key={`${
                            v.diningType + v.groupCapacity + food.foodName
                          }`}>
                          <Table.Cell
                            style={{borderLeft: '1px solid #eee'}}
                            textAlign="center">
                            <FoodBox>{food.foodName}</FoodBox>
                          </Table.Cell>
                          <Table.Cell
                            style={{borderLeft: '1px solid #eee'}}
                            textAlign="center">
                            <FoodBox>{withCommas(food.foodCapacity)}</FoodBox>
                          </Table.Cell>
                        </Table.Row>
                      );
                    }
                  });
                });
              })}
            </Table.Body>
          </Table>
        </TableWrapper>
      )}
    </Wrap>
  );
};

export default DailyFoodPage;
const Wrap = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  padding-right: 24px;
  padding-left: 24px;
`;
const FoodBox = styled.div`
  border-left-width: 1px;
  border-left-color: #ccc;
`;
const Image = styled.img`
  object-fit: cover;
  width: 120px;
  height: 80px;
  align-self: center;
  text-align: center;
`;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #bdbac1;
`;

const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
`;
const DateSpan = styled.span`
  margin: 0px 4px;
`;
const ButtonWrap = styled.div`
  margin-left: 10px;
`;
