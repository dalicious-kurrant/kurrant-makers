import {useEffect, useRef, useState} from 'react';
import {Button, Header, Label, Table} from 'semantic-ui-react';
import {Table as AntTable} from 'antd';

import styled, {css} from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import DiningButton from './components/DiningButton';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import {useGetSalesList} from '../../hook/useSalesList';
import {maskingName} from '../../utils/maskingName';
import TestData from './test';
import {useAtom} from 'jotai';
import {pageWidthAtom} from '../../utils/store/store';

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
const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [innerWidth] = useAtom(pageWidthAtom);
  const [endDate, setEndDate] = useState(days);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState('scroll');
  const [diningSelect, setDiningSelect] = useState([0, 1, 2]);
  console.log(window.innerWidth, '---');
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

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }
  const totalCount = totalFood
    ?.map(el => el.totalFoodCount)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  useEffect(() => {
    refetch();
  }, [startDate, endDate, refetch]);

  return (
    <Wrap innerWidth={innerWidth}>
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
        <TopTable innerWidth={innerWidth}>
          <TotalTable>
            {innerWidth < 786 ? (
              <AntTable
                style={{whiteSpace: 'pre-wrap'}}
                dataSource={salesList?.data?.data?.totalFoods.map(v => {
                  return {
                    foodName: v.foodName + `\n` + v.description,
                    totalFoodCount: v.totalFoodCount,
                  };
                })}
                columns={columns}
                pagination={false}
              />
            ) : (
              <Table singleLine styld={{overflow: 'hidden'}}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">
                      상품명
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      상품상세정보
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      합계(개)
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {salesList?.data?.data?.totalFoods?.map((el, i) => {
                    return (
                      <Table.Row key={el.foodName + i + el.foodId}>
                        <Table.Cell>
                          <FoodName>{el.foodName}</FoodName>
                        </Table.Cell>
                        <Table.Cell>
                          <Description>{el.description}</Description>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <div style={{width: 50}}> {el.totalFoodCount}</div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}

                  <Table.Row>
                    <Table.Cell style={{borderTop: 'double black'}}>
                      <BoldText>Total</BoldText>
                    </Table.Cell>
                    <Table.Cell
                      style={{borderTop: 'double black'}}></Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      style={{borderTop: 'double black'}}>
                      <BoldText>{totalCount}</BoldText>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            )}
          </TotalTable>
          {innerWidth < 786 ? (
            <DetailTableAnt>
              {salesList?.data?.data?.foodByDateDiningTypes.map((el, i) => {
                const test = totalFood.map(s => {
                  return el.foods.filter(v => v.foodId === s.foodId)[0];
                });
                const removeUndefinedList = test.filter(
                  data => data !== undefined,
                );
                const columnsHeader = [
                  {
                    title: '상품명',
                    dataIndex: 'foodName',
                    key: 'foodName',
                    width: '150px',
                  },
                  {
                    title: el.serviceDate,
                    dataIndex: 'foodCount',
                    key: 'foodCount',
                    width: '150px',
                  },
                ];
                return (
                  <div key={el.serviceDate + i + el.diningType}>
                    <AntTable
                      dataSource={removeUndefinedList}
                      columns={columnsHeader}
                      pagination={false}
                    />
                  </div>
                );
              })}
            </DetailTableAnt>
          ) : (
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
                          <Table.HeaderCell style={{whiteSpace: 'nowrap'}}>
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
                            <Table.Row key={'foodId' + i}>
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
          )}
        </TopTable>
      </TableWrapper>
      <TableWrapper>
        {salesList?.data?.data?.groupFoodByDateDiningTypes.map((el, idx) => {
          const spotCount = el.foodByGroups.map(v => {
            return v.spotByDateDiningTypes.length;
          });
          const spotTotal = spotCount.reduce((arr, cur) => {
            return arr + cur;
          });
          console.log(spotTotal);
          return (
            <MakersTable
              key={'groupFoodByDateDiningTypes' + idx + el.serviceDate}>
              <BoldText>
                {el.serviceDate + `\u00A0` + el.diningType} ( {spotTotal}개 상세
                스팟)
              </BoldText>
              <DateLine />
              <DiningTypeWrap>
                <MealDetailWrap>
                  {el.foodByGroups.map((v, l) => {
                    return v.spotByDateDiningTypes.map((spot, i) => {
                      let foodTotalCount = 0;
                      const columnsHeader = [
                        {
                          title: '상품명',
                          dataIndex: 'foodName',
                          key: 'foodName',
                          width: '150px',
                        },
                        {
                          title: '수량',
                          dataIndex: 'foodCount',
                          key: 'foodCount',
                          width: '150px',
                        },
                      ];
                      return (
                        <TableWrap
                          key={
                            v.groupId +
                            v.groupName +
                            spot.spotId +
                            spot.spotName +
                            l +
                            idx
                          }>
                          <div
                            style={{
                              marginRight: 10,
                              marginTop: 24,
                            }}>
                            <Label
                              content={`상세 스팟 ID: ${spot.spotId}`}
                              color="blue"
                            />
                            <Label content={spot.pickupTime} color="black" />
                            {innerWidth < 786 ? (
                              <AntTable
                                dataSource={spot.foods}
                                columns={columnsHeader}
                                pagination={false}
                              />
                            ) : (
                              <Table celled>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell textAlign="center">
                                      <div style={{width: 150}}>상품명</div>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">
                                      <div style={{width: 50}}>수량</div>
                                    </Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                  {spot.foods.map((food, index) => {
                                    foodTotalCount =
                                      foodTotalCount + food.foodCount;
                                    return (
                                      <Table.Row
                                        key={
                                          'BodyFood' +
                                          spot.spotId +
                                          spot.spotName +
                                          food.foodName +
                                          index +
                                          i +
                                          food.foodCount +
                                          idx
                                        }>
                                        <Table.Cell>{food.foodName}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                          {food.foodCount}
                                        </Table.Cell>
                                      </Table.Row>
                                    );
                                  })}
                                  <Table.Row
                                    style={{
                                      backgroundColor: '#efefef',
                                      fontWeight: 600,
                                    }}>
                                    <Table.Cell>합계</Table.Cell>
                                    <Table.Cell textAlign="center">
                                      {foodTotalCount}
                                    </Table.Cell>
                                  </Table.Row>
                                </Table.Body>
                              </Table>
                            )}
                          </div>
                        </TableWrap>
                      );
                    });
                  })}
                </MealDetailWrap>
              </DiningTypeWrap>
            </MakersTable>
          );
        })}
      </TableWrapper>
    </Wrap>
  );
};

export default Schedule;

const Wrap = styled.div`
  margin: 100px 0px 50px 0;
  padding-right: 20px;
  ${({innerWidth}) => {
    return css`
      max-width: ${innerWidth}px;
      padding: 10px;
      overflow-x: hidden;
    `;
  }}
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
  @media (max-width: 768px) {
    flex-direction: column;
    min-width: 100px;
    max-width: ${({innerWidth}) => innerWidth}px;
    padding: 15px;
  }
`;

const MakersTable = styled.div`
  margin-top: 50px;
`;

const TotalTable = styled.div`
  margin-bottom: 30px;
  //width: 30%;
`;

const DetailTableAnt = styled.div`
  display: flex;
  max-width: 800px;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;
const DetailTable = styled.div`
  display: flex;
  overflow-x: auto;
`;

const MealDetailWrap = styled.div`
  display: flex;
  margin-right: 24px;
  padding-bottom: 10px;
  //overflow-x: auto;
  flex-wrap: wrap;
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

const Description = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 280px;
`;

const FoodName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
`;
