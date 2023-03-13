import {useEffect, useRef, useState} from 'react';
import {Button, Header, Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import DiningButton from './components/DiningButton';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import {useGetSalesList} from '../../hook/useSalesList';
import {maskingName} from '../../utils/maskingName';

const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const [diningSelect, setDiningSelect] = useState([0, 1, 2]);

  const types =
    diningSelect &&
    diningSelect.map(el => {
      if (el === 0) {
        return 1;
      }
      if (el === 1) {
        return 2;
      }
      if (el === 2) {
        return 3;
      }
      return el;
    });

  const {data: salesList, refetch} = useGetSalesList(startDate, endDate, types);

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  // const loadButton = () => {
  //   refetch();
  // };
  const totalFood = salesList?.data?.data?.totalFoods;

  const totalCount = totalFood
    ?.map(el => el.totalFoodCount)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  useEffect(() => {
    refetch();
  }, [startDate, endDate, refetch]);
  return (
    <Wrap>
      <Header as="h2">기간별 판매 내역</Header>
      <CalendarWrap>
        <div>
          <DateInput
            type="date"
            defaultValue={startDate}
            onChange={e => getStartDate(e)}
          />
          <DateSpan>-</DateSpan>
          <DateInput
            type="date"
            defaultValue={endDate}
            onChange={e => getEndDate(e)}
          />
        </div>
        {/* <ButtonWrap>
          <Button content="조회하기" basic size="tiny" onClick={loadButton} />
        </ButtonWrap> */}
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
                    합계(개)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {salesList?.data?.data?.totalFoods?.map((el, i) => {
                  return (
                    <Table.Row key={el.foodName + i + el.foodId}>
                      <Table.Cell>{el.foodName}</Table.Cell>
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
            {salesList?.data?.data?.foodByDateDiningTypes.map((el, i) => {
              const test = totalFood.map(s => {
                return el.foods.filter(v => v.foodId === s.foodId)[0];
              });
              return (
                <div key={el.serviceDate + i + el.diningType}>
                  <Table style={{height: 100}}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          key={el.serviceDate + el.diningType}
                          style={{whiteSpace: 'nowrap'}}>
                          {el.serviceDate + `\u00A0` + el.diningType}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {test.map((v, i) => {
                        if (v) {
                          return (
                            <Table.Row key={v.foodId + i + v.foodName}>
                              <Table.Cell textAlign="center">
                                {v.foodCount}
                              </Table.Cell>
                            </Table.Row>
                          );
                        }
                        return (
                          <Table.Row key={i}>
                            <Table.Cell textAlign="center">{`\u00A0`}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                      <Table.Row>
                        <Table.Cell
                          textAlign="center"
                          style={{borderTop: 'double black'}}>
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
        {salesList?.data?.data?.groupFoodByDateDiningTypes.map((el, idx) => (
          <MakersTable
            key={'groupFoodByDateDiningTypes' + idx + el.serviceDate}>
            <BoldText>{el.serviceDate + `\u00A0` + el.diningType}</BoldText>
            <DateLine />
            <DiningTypeWrap>
              <MealDetailWrap>
                {el.foodByGroups.map((v, l) => {
                  return (
                    <TableWrap key={v.groupId + v.groupName + l + idx}>
                      {v.spotByDateDiningTypes.map((spot, i) => {
                        return (
                          <div
                            key={spot.spotId + spot.spotName + i + l + idx}
                            style={{marginRight: 10}}>
                            <Label
                              content={maskingName(v.groupName)}
                              color="green"
                            />
                            <Label content={spot.deliveryTime} color="black" />
                            <Table celled>
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell textAlign="center">
                                    <div style={{width: 150}}>상품명</div>
                                  </Table.HeaderCell>
                                  <Table.HeaderCell textAlign="center">
                                    수량
                                  </Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>
                              {spot.foods.map((food, index) => {
                                return (
                                  <Table.Body
                                    key={
                                      spot.spotId +
                                      spot.spotName +
                                      food.foodName +
                                      index +
                                      i +
                                      l +
                                      idx
                                    }>
                                    <Table.Row>
                                      <Table.Cell>{food.foodName}</Table.Cell>
                                      <Table.Cell textAlign="center">
                                        {food.foodCount}
                                      </Table.Cell>
                                    </Table.Row>
                                  </Table.Body>
                                );
                              })}
                            </Table>
                          </div>
                        );
                      })}
                    </TableWrap>
                  );
                })}
              </MealDetailWrap>
            </DiningTypeWrap>
          </MakersTable>
        ))}
      </TableWrapper>
    </Wrap>
  );
};

export default Schedule;

const Wrap = styled.div`
  margin: 100px 0px 50px 0;
  padding-right: 20px;
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

const TopTable = styled.div`
  margin-top: 50px;
  display: flex;
`;

const MakersTable = styled.div`
  margin-top: 50px;
`;

const TotalTable = styled.div`
  /* margin-right: 10px; */
  width: 30%;
`;

const DetailTable = styled.div`
  display: flex;
  overflow-x: auto;
`;

const MealDetailWrap = styled.div`
  display: flex;
  margin-right: 24px;
  /* overflow-x: auto;
  padding-bottom: 10px; */

  /* width: 100%; */
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
  margin-right: 5px;
`;
const BoldText = styled.span`
  font-weight: 700;
`;

const DateLine = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[5]};
`;
