import {useRef, useState} from 'react';
import {Button, Header, Table} from 'semantic-ui-react';

import styled, {css, useTheme} from 'styled-components';
import DiningButton from './DiningButton';
import {TableWrapper} from '../../../layout/common.style';
import withCommas from '../../../utils/withCommas';
import DeliveryCard from './DeliveryCard';
import {formattedWeekDate} from '../../../utils/dateFormatter';

const columns = [
  {
    title: '상품명 및 상세정보',
    dataIndex: 'foodName',
    key: 'foodName',
    width: 150,
  },
  {
    title: '합계(개)',
    dataIndex: 'totalFoodCount',
    key: 'totalFoodCount',
    width: 100,
  },
];

const DesktopMode = ({
  endDate,
  setEndDate,
  startDate,
  setStartDate,
  salesList,
  refetch,
  diningSelect,
  setDiningSelect,
}) => {
  const getStartDate = e => {
    setStartDate(new Date(e.target.value));
  };
  const getEndDate = e => {
    setEndDate(new Date(e.target.value));
  };

  const loadButton = () => {
    refetch();
  };
  const totalFood = salesList?.totalFoods;

  const totalCount = totalFood
    ?.map(el => el.totalFoodCount)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  return (
    <>
      <Header as="h2">주문 정보</Header>

      <CalendarWrap>
        <div>
          <DateInput
            type="date"
            defaultValue={formattedWeekDate(startDate)}
            onChange={e => getStartDate(e)}
          />
          <DateSpan>-</DateSpan>
          <DateInput
            type="date"
            defaultValue={formattedWeekDate(endDate)}
            onChange={e => getEndDate(e)}
          />
        </div>
        <ButtonWrap>
          <Button content="조회하기" basic size="tiny" onClick={loadButton} />
        </ButtonWrap>
      </CalendarWrap>
      <DiningButton touch={diningSelect} setTouch={setDiningSelect} />
      <TableWrapper>
        <TopTable>
          <TotalTable>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">상품명</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    상품상세정보
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" style={{whiteSpace:'nowrap'}}>
                    합계(개)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {salesList?.totalFoods?.map((el, i) => {
                  return (
                    <Table.Row key={el.foodName + i}>
                      <Table.Cell>
                        {' '}
                        <FoodName>{el.foodName}</FoodName>
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <Description>{el.description}</Description>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {el.totalFoodCount}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}

                <Table.Row>
                  <Table.Cell style={{borderTop: 'double black'}}>
                    <BoldText>Total</BoldText>
                  </Table.Cell>
                  <Table.Cell style={{borderTop: 'double black'}}></Table.Cell>
                  <Table.Cell
                    textAlign="center"
                    style={{borderTop: 'double black'}}>
                    <BoldText>{totalCount}</BoldText>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </TotalTable>
          <DetailTable>
            {salesList?.foodByDateDiningTypes?.map((el, i) => {
              const test = totalFood.map(s => {
                return el.foods.filter(v => v.foodId === s.foodId)[0];
              });
              return (
                <div key={el.serviceDate + el.diningType + i}>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell style={{whiteSpace: 'nowrap'}}>
                          {el.serviceDate + `\u00A0` + el.diningType}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {test.map((v, i) => {
                        if (v) {
                          return (
                            <Table.Row key={el.serviceDate + v.foodId}>
                              <Table.Cell textAlign="center">
                                {v.foodCount}
                              </Table.Cell>
                            </Table.Row>
                          );
                        }
                        return (
                          <Table.Row key={i}>
                            <Table.Cell>{`\u00A0`}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                      <Table.Row key={el.diningType + el.serviceDate}>
                        <Table.Cell
                          textAlign="center"
                          style={{borderTop: ' double black'}}>
                          <BoldText>{el.totalCount}</BoldText>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              );
            })}
          </DetailTable>
        </TopTable>
      </TableWrapper>
      <TableWrapper>
        {salesList?.deliveryGroupsByDates.map((el, idx) => {
          return (
            <MakersTable key={idx}>
              <BoldText>{el.serviceDate + `\u00A0` + el.diningType}</BoldText>
              <DateLine />
              <DiningTypeWrap>
                <MealDetailWrap>
                  {el.deliveryGroups.map((v, index) => {
                    const deliveryCount = v.foodBySpots?.length || 0;
                    return (
                      <MealDetail key={index}>
                        <TimeWrapContainer>
                          <TimeWrap>
                            <TimeBox>
                              도착 완료 시간
                              <TimeBoxTime>{v.deliveryTime}</TimeBoxTime>
                            </TimeBox>
                            <TimeBox>
                              총 주문수량
                              <TimeBoxTime>{deliveryCount}개</TimeBoxTime>
                            </TimeBox>
                          </TimeWrap>
                          <TotalFoodWrap>
                            {v.foods.map(f => {
                              return (
                                <TotalFoodItems key={f.foodId}>
                                  <FoodItemName>{f.foodName}</FoodItemName>
                                  <FoodCount>{f.foodCount} 개</FoodCount>
                                </TotalFoodItems>
                              );
                            })}
                            <TotalFoodCount>
                              총 {withCommas(v.foodCount)} 개
                            </TotalFoodCount>
                          </TotalFoodWrap>
                        </TimeWrapContainer>

                        <MealDetailTimeWrap>
                          {v.foodBySpots.map((spot, i) => {
                            return <DeliveryCard key={i} spot={spot} />;
                          })}
                        </MealDetailTimeWrap>
                      </MealDetail>
                    );
                  })}
                </MealDetailWrap>
              </DiningTypeWrap>
            </MakersTable>
          );
        })}
      </TableWrapper>
    </>
  );
};

export default DesktopMode;

const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  min-width: 1024px;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #bdbac1;
`;
const TotalFoodItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
`;
const FoodItemName = styled.div`
  max-width: 150px;
`;
const FoodCount = styled.div`
  flex-wrap: nowrap;
  white-space: nowrap;
`;
const TotalFoodItems2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 400;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const TotalSpotFoodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding-top: 12px;
`;
const FoodItemName2 = styled.div`
  max-width: 215px;
`;
const FoodCount2 = styled.div`
  flex-wrap: nowrap;
  white-space: nowrap;
`;
const Line = styled.div`
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 16px;
  margin-bottom: 12px;
  width: 100%;
`;
const TotalFoodCount = styled.div`
  font-weight: 400;
  align-self: flex-end;
  font-size: 13px;
`;
const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
`;

const TopTable = styled.div`
  margin-top: 50px;
  display: flex;
`;

const MakersTable = styled.div`
  margin-top: 50px;
`;

const TotalTable = styled.div``;

const DetailTable = styled.div`
  overflow-x: auto;
  display: flex;
`;

const MealDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;
const MealDetail = styled.div`
  display: flex;
  margin-top: 20px;
`;
const MealDetailTimeWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  gap: 40px;
`;

const DiningTypeWrap = styled.div`
  display: flex;
  margin-top: 24px;
`;

const DateSpan = styled.span`
  margin: 0px 4px;
`;

const ButtonWrap = styled.div`
  margin-left: 10px;
`;

const TableWrap = styled.div`
  display: flex;
  max-width: 306px;
  padding: 24px;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
`;
const TimeWrapContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  min-width: 207px;
  margin-right: 48px;
`;

const TimeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Pretendard-Regular';
  min-width: 207px;
`;
const TotalFoodWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 24px;
  background-color: #f5f5f5;
  gap: 8px;
`;
const TimeBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  align-items: flex-start;
  flex-direction: column;
`;
const TimeBoxTime = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-weight: 600;
  margin-top: 4px;
  font-size: 20px;
`;
const BoldText = styled.span`
  font-weight: 700;
`;

const DateLine = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[5]};
`;

const LabelWrap = styled.div`
  min-width: 250px;
`;
const SpotLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
  padding: 2px 4px;
  letter-spacing: -0.5px;
  border-radius: 4px;
  ${({spot, theme}) => {
    if (spot === 0)
      return css`
        color: ${theme.colors.blue[500]};
        background-color: ${theme.colors.blue[100]};
      `;
    return css`
      color: ${theme.colors.pink[500]};
      background-color: ${theme.colors.pink[100]};
    `;
  }}
`;
const TitleIdLabel = styled.div`
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  font-weight: 600;

  color: ${({spot, theme}) =>
    spot === 0 ? theme.colors.blue[500] : theme.colors.pink[500]};
`;
const ContentsDetailLabel = styled.div`
  display: flex;
  white-space: nowrap;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 600;
  color: #343337;
`;
const ContentsDetailLabel2 = styled.div`
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 600;
  color: #343337;
`;
const ContentsDetailLabelWrap = styled.div`
  display: flex;
  gap: 5px;
`;
const FoodName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
`;
const Description = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
`;

const TableBox = styled.div`
  margin-right: 10px;
  margin-top: 12px;
`;
