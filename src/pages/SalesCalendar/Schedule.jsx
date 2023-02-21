import {useEffect, useRef, useState} from 'react';
import {Button, Header, Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import Select from 'react-select';
import DiningButton from './components/DiningButton';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import {useGetSalesList} from '../../hook/useSalesList';

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

  //console.log(salesList, '99');

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const loadButton = () => {
    refetch();
  };

  const aa = salesList?.data?.data?.totalFoods;
  console.log(aa);
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
                  <Table.HeaderCell>상품명</Table.HeaderCell>
                  <Table.HeaderCell>합계(개)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {salesList?.data?.data?.totalFoods?.map((el, i) => {
                  return (
                    <Table.Row key={el.foodName + i}>
                      <Table.Cell>{el.foodName}</Table.Cell>
                      <Table.Cell>{el.totalFoodCount}</Table.Cell>
                    </Table.Row>
                  );
                })}

                <Table.Row>
                  <Table.Cell>Total</Table.Cell>
                  <Table.Cell>20</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </TotalTable>
          <DetailTable>
            <div style={{display: 'flex'}}>
              {salesList?.data?.data?.foodByDateDiningTypes.map((el, i) => {
                return (
                  <Table key={el.serviceDate + i}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell style={{whiteSpace: 'nowrap'}}>
                          {el.serviceDate + el.diningType}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {aa.map((c, index) => {
                        return el.foods.map((v, idx) => {
                          console.log(c, v);
                          if (c.foodId === v.foodId) {
                            return (
                              <Table.Row>
                                <Table.Cell>{v.foodCount}</Table.Cell>
                              </Table.Row>
                            );
                          }
                        });
                      })}
                    </Table.Body>
                    {el.foods.map((v, idx) => {})}
                  </Table>
                );
              })}
            </div>
            {/* <Table celled style={{width: '100%'}}></Table> */}
          </DetailTable>
        </TopTable>
      </TableWrapper>
      <TableWrapper>
        <MakersTable>
          <Label content="2월 20일 아침" color="yellow" />
          <DiningTypeWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 A</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 B</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
          </DiningTypeWrap>
        </MakersTable>
        <MakersTable>
          <Label content="2월 20일 점심" color="yellow" />
          <DiningTypeWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 C</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
            <MealDetailWrap>
              <div>
                <div>배송 시간</div>
                <div>고객사 D</div>
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>상품명</Table.HeaderCell>
                        <Table.HeaderCell>수량</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>꽃맛살샐러드</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </MealDetailWrap>
          </DiningTypeWrap>
        </MakersTable>
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
const SelectBox = styled(Select)`
  width: 250px;
`;

const MakersTable = styled.div`
  margin-top: 50px;
`;

const TotalTable = styled.div`
  margin-right: 10px;
  width: 30%;
`;

const DetailTable = styled.div`
  overflow-x: auto;
`;

const MealDetailWrap = styled.div`
  display: flex;
  margin-right: 24px;
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
