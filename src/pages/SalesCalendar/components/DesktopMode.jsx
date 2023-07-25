import {Button, Header, Table} from 'semantic-ui-react';

import styled, {} from 'styled-components';
import DiningButton from './DiningButton';
import {TableWrapper} from '../../../layout/common.style';
import withCommas from '../../../utils/withCommas';
import DeliveryCard from './DeliveryCard';
import {formattedWeekDate, formattedWeekDateTime} from '../../../utils/dateFormatter';


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
    <Wrapper innerWidth={window.innerWidth}>
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
                  <Table.HeaderCell
                    textAlign="center"
                    style={{whiteSpace: 'nowrap'}}>
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
              <ServiceDateContainer>
                <BoldText>{el.serviceDate + `\u00A0` + el.diningType}</BoldText>
                <DeadLineBox status={true}>주문마감</DeadLineBox>
                <DeadLineText>주문 마감 {formattedWeekDateTime(new Date())}</DeadLineText>
              </ServiceDateContainer>
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
                              픽업 시간
                              <TimeBoxTime>{v.pickUpTime}</TimeBoxTime>
                            </TimeBox>
                            <TimeBox>
                              총 배송 건수
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
    </Wrapper>
  );
};

export default DesktopMode;

const Wrapper = styled.div`
  width: ${({innerWidth})=> `${innerWidth-300}px`};
  flex-wrap:wrap;
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
const ServiceDateContainer = styled.div`
  display: flex;
  align-items: center;
`
const DeadLineBox = styled.div`
  background-color: #eee;
  color:${({theme,status})=> status ? theme.colors.red[500] : theme.colors.blue[500] };
  font-size: 13px;
  font-weight: 600;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 10px;
  margin-left: 10px;
`
const DeadLineText = styled.div`
  font-size: 13px;
  font-weight: 600;
margin-left: 10px;
`
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


