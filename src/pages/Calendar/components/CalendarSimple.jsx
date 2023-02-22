import {Button, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from '../../../layout/common.style';
import ThirdSwitch from '../../../component/ThirdSwitch';
import styled from 'styled-components';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import {formattedWeekDate} from '../../../utils/dateFormatter';
import {
  addDays,
  eachWeekOfInterval,
  subDays,
  eachDayOfInterval,
} from 'date-fns';

const CalendarSimple = ({testData, setTestData}) => {
  const DiningButton = (date, diningType) => {
    const result = testData.map(data => {
      if (data.serviceDate === date && data.diningType === diningType) {
        return (
          <DiningContainer key={data.presetMakersId + data.serviceDate}>
            {data.makersCapa}
            <Button
              size="mini"
              onClick={() => {
                setTestData(
                  testData.map(makers => {
                    if (makers.presetMakersId === data.presetMakersId) {
                      return {
                        ...makers,
                        scheduleStatus:
                          data.scheduleStatus === 0
                            ? 1
                            : data.scheduleStatus === 1
                            ? 2
                            : 0,
                        clientSchedule: makers.clientSchedule.map(client => {
                          return {
                            ...client,
                            foodSchedule: client.foodSchedule.map(food => {
                              return {
                                ...food,
                                scheduleStatus:
                                  data.scheduleStatus === 0
                                    ? 1
                                    : data.scheduleStatus === 1
                                    ? 2
                                    : 0,
                              };
                            }),
                          };
                        }),
                      };
                    }
                    return makers;
                  }),
                );
              }}
              color={
                data.scheduleStatus === 0
                  ? 'grey'
                  : data.scheduleStatus === 1
                  ? 'green'
                  : 'red'
              }>
              {data.scheduleStatus === 0
                ? '대기'
                : data.scheduleStatus === 1
                ? '승인'
                : '거절'}
            </Button>
          </DiningContainer>
        );
      }
    });

    return result;
  };
  const dates = eachWeekOfInterval(
    {
      start: subDays(
        new Date(
          moment(testData[0].serviceDate).startOf('IOSWeek').toLocaleString(),
        ),
        0,
      ), // 지난주
      end: addDays(new Date(), 21), // 다음주
    },
    {
      weekStartsOn: 0, // 일요일부터 시작
    },
  ).reduce((acc, cur) => {
    const allDays = eachDayOfInterval({
      start: cur,
      end: addDays(cur, 6),
    });
    acc.push(allDays);
    return acc;
  }, []);

  return (
    <Container>
      {dates.map((week, i) => {
        return (
          <Wrapper key={`week${i}`}>
            <TableWrapper>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">요일</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">일</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">화</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">수</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">목</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">금</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">토</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell textAlign="center">
                      <FlexBoxHeader>날짜</FlexBoxHeader>
                    </Table.Cell>
                    {week.map((s, idx) => {
                      return (
                        <Table.Cell
                          key={`week${i}days${idx}`}
                          textAlign="center">
                          {formattedWeekDate(s)}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign="center">
                      <FlexBoxHeader>아침</FlexBoxHeader>
                    </Table.Cell>
                    {week.map((morning, morningi) => {
                      return (
                        <Table.Cell
                          key={`week${i}morning${morningi}`}
                          textAlign="center">
                          <FlexBox>
                            {DiningButton(formattedWeekDate(morning), '아침')}
                          </FlexBox>
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign="center">
                      <FlexBoxHeader>점심</FlexBoxHeader>
                    </Table.Cell>
                    {week.map((lunch, lunchi) => {
                      return (
                        <Table.Cell
                          key={`week${i}lunch${lunchi}`}
                          textAlign="center">
                          <FlexBox>
                            {DiningButton(formattedWeekDate(lunch), '점심')}
                          </FlexBox>
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign="center">
                      <FlexBoxHeader>저녁</FlexBoxHeader>
                    </Table.Cell>
                    {week.map((dinner, dinneri) => {
                      return (
                        <Table.Cell
                          key={`week${i}dinner${dinneri}`}
                          textAlign="center">
                          <FlexBox>
                            {DiningButton(formattedWeekDate(dinner), '저녁')}
                          </FlexBox>
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                </Table.Body>
              </Table>
            </TableWrapper>
          </Wrapper>
        );
      })}
    </Container>
  );
};

export default CalendarSimple;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;
const FlexBoxHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
const DiningContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
`;
