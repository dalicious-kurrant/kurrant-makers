import {Button, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from '../../../layout/common.style';
import ThirdSwitch from '../../../component/ThirdSwitch'
import styled from 'styled-components';

const CalendarDetail = ({count,testData,setTestData}) => {
    return(
        <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
              <Table.HeaderCell>날짜</Table.HeaderCell>
              <Table.HeaderCell>다이닝타입</Table.HeaderCell>
              <Table.HeaderCell>메이커스 케파</Table.HeaderCell>
              <Table.HeaderCell>픽업시간</Table.HeaderCell>
              <Table.HeaderCell>고객사</Table.HeaderCell>
              <Table.HeaderCell>고객사 케파</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                음식 승인
              </Table.HeaderCell>
              <Table.HeaderCell>상품</Table.HeaderCell>
              <Table.HeaderCell>음식 상태</Table.HeaderCell>
              <Table.HeaderCell>Food 케파</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {testData.map((v, i) => {
              return v.clientSchadule.map((s, si) => {
                return s.foodSchadule.map((d, di) => {
                  return (
                    <Table.Row key={`${d.food + di}`}>
                      <Table.Cell
                        padding="0px"
                        textAlign="center"></Table.Cell>
                      {di === 0 && si === 0 && (
                        <Table.Cell padding="0px" rowSpan={count[i]}>
                          <FlexBox>
                           <ThirdSwitch id={v.presetMakersId} data={testData} setData={setTestData} status={v.schaduleStatus}/>
                          </FlexBox>
                        </Table.Cell>
                      )}
                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          {v.serviceDate}
                        </Table.Cell>
                      )}
                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          {v.diningType}
                        </Table.Cell>
                      )}
                      {di === 0 && si === 0 && (
                        <Table.Cell rowSpan={count[i]}>
                          {v.makersCapa}
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchadule.length}>
                          {s.pickupTime}
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchadule.length}>
                          {s.clientName}
                        </Table.Cell>
                      )}
                      {di === 0 && (
                        <Table.Cell rowSpan={s.foodSchadule.length}>
                          {s.clientCapa}
                        </Table.Cell>
                      )}
                      <Table.Cell textAlign="center">
                        <Button
                          toggle
                          color={ d.schaduleStatus === 0? "grey":d.schaduleStatus===1 ? "green":"red" }
                          onClick={()=>{setTestData(testData.map((makers)=>{
                            return {...makers ,clientSchadule:makers.clientSchadule.map((client)=>{
                              return {...client,foodSchadule:client.foodSchadule.map((food)=>{
                                if(food.presetFoodId === d.presetFoodId){
                                    return {...food,schaduleStatus:d.schaduleStatus === 0? 1:d.schaduleStatus===1 ? 2:0}
                                }
                                return food;
                              })}
                            })}
                        }))}}>
                          {d.schaduleStatus === 0? '대기':d.schaduleStatus===1 ? "승인":"거절"}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{d.food}</Table.Cell>
                      <Table.Cell>{d.foodStatus}</Table.Cell>
                      <Table.Cell>{d.foodCapa}</Table.Cell>
                    </Table.Row>
                  );
                });
              });
            })}
          </Table.Body>
        </Table>
      </TableWrapper>
    )

}

export default CalendarDetail;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;