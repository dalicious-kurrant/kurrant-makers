import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button} from 'semantic-ui-react';
import {PageWrapper} from '../../layout/common.style';
import CalendarDetail from './components/CalendarDetail';
import CalendarSimple from './components/CalendarSimple';
const makersCalendar = [
  {
    presetMakersId: 1,
    schaduleStatus: 0,
    serviceDate: '2023-02-21',
    diningType: '아침',
    makersCapa: 100,
    leftMakersCapa: 80,
    deadline: '2023/02/30 18:00:00',
    clientSchadule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapa: 20,
        foodSchadule: [
          {
            presetFoodId: 9,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 1,
          },
          {
            presetFoodId: 10,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 1,
          },
        ],
      },
    ],
  },
  {
    presetMakersId: 2,
    schaduleStatus: 1,
    serviceDate: '2023-02-22',
    diningType: '아침',
    makersCapa: 100,
    deadline: '2023/02/30 18:00:00',
    clientSchadule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapa: 20,
        foodSchadule: [
          {
            presetFoodId: 1,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
          {
            presetFoodId: 8,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
        ],
      },
    ],
  },
  {
    presetMakersId: 3,
    schaduleStatus: 0,
    serviceDate: '2023-02-23',
    diningType: '아침',
    makersCapa: 100,
    deadline: '2023/02/30 18:00:00',
    clientSchadule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapa: 20,
        foodSchadule: [
          {
            presetFoodId: 2,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
          {
            presetFoodId: 3,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
          {
            presetFoodId: 4,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
        ],
      },
    ],
  },
  {
    presetMakersId: 5,
    schaduleStatus: 0,
    serviceDate: '2023-02-23',
    diningType: '점심',
    makersCapa: 100,
    deadline: '2023/02/30 18:00:00',
    clientSchadule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapa: 20,
        foodSchadule: [
          {
            presetFoodId: 5,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
          {
            presetFoodId: 6,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
          {
            presetFoodId: 7,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
        ],
      },
    ],
  },
  {
    presetMakersId: 4,
    schaduleStatus: 2,
    serviceDate: '2023-02-24',
    diningType: '아침',
    makersCapa: 100,
    deadline: '2023/02/30 18:00:00',
    clientSchadule: [
      {
        pickupTime: '07:50',
        clientName: '달리셔스',
        clientCapa: 20,
        foodSchadule: [
          {
            presetFoodId: 11,
            food: '음식sdfsdfdsfsdfsdfsdasdasda sdsadsadasdadadasda sdadadasdasdasdadsdsdf',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
          {
            presetFoodId: 12,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
          {
            presetFoodId: 13,
            food: '음식',
            foodStatus: '판매중',
            foodCapa: 100,
            schaduleStatus: 0,
          },
        ],
      },
    ],
  },
];

const Calendar = () => {
  // const {data: makersCalendar} = useGetCalendarList();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(false);
  const [group, setGroupAccess] = useState([{}]);
  const [foodAct, setFoodAct] = useState([{}]);
  const [testData, setTestData] = useState(makersCalendar);

  useEffect(() => {
    setCount(
      makersCalendar.map((v, i) => {
        let num = 0;
        v.clientSchadule.map((s, si) => {
          return s.foodSchadule.map((d, di) => {
            return num++;
          });
        });
        return num;
      }),
    );
  }, []);
  useEffect(() => {
    const groupAccess = [];
    const foodAccess = [];
    testData.map(data => {
      groupAccess.push({
        presetMakersId: data.presetMakersId,
        schaduleStatus: data.schaduleStatus,
      });
      return data.clientSchadule.map(client => {
        return client.foodSchadule.map(food => {
          return foodAccess.push({
            presetFoodId: food.presetFoodId,
            schaduleStatus: food.schaduleStatus,
          });
        });
      });
    });
    setGroupAccess(groupAccess);
    setFoodAct(foodAccess);
  }, [testData]);
  return (
    <PageWrapper>
      <Wrapper>
        <TitleBox>일정관리</TitleBox>
        <SaveContainer page={page}>
          <ExampleBox>
            <Button color="grey">대기</Button>
            <Arrow>{`->`}</Arrow>
            <Button color="green">승인</Button>
            <Arrow>{`->`}</Arrow>
            <Button color="red">거절</Button>
          </ExampleBox>
          <SaveBox>
            <Button
              toggle
              color={'twitter'}
              active={false}
              size={'large'}
              onClick={() => {
                const req = {
                  group: group,
                  food: foodAct,
                };
                alert('저장되었습니다.');
                console.log(req);
              }}>
              저장
            </Button>
          </SaveBox>
        </SaveContainer>
        <HeaderBox page={page}>
          <ViewTypeBox>
            <Button
              toggle
              color={page ? 'grey' : 'facebook'}
              active={false}
              size={'large'}
              onClick={() => {
                setPage(false);
              }}>
              간편보기
            </Button>
            <Button
              toggle
              color={page ? 'facebook' : 'grey'}
              active={false}
              size={'large'}
              onClick={() => {
                setPage(true);
              }}>
              상세보기
            </Button>
          </ViewTypeBox>
          <AccessBox>
            <Button
              toggle
              color={'green'}
              active={false}
              size={'large'}
              onClick={() => {
                setTestData(
                  testData.map(makers => {
                    return {
                      ...makers,
                      schaduleStatus: 1,
                      clientSchadule: makers.clientSchadule.map(client => {
                        return {
                          ...client,
                          foodSchadule: client.foodSchadule.map(food => {
                            return {...food, schaduleStatus: 1};
                          }),
                        };
                      }),
                    };
                  }),
                );
              }}>
              전체승인
            </Button>
            <Button
              toggle
              color={'red'}
              active={false}
              size={'large'}
              onClick={() => {
                setTestData(
                  testData.map(makers => {
                    return {
                      ...makers,
                      schaduleStatus: 2,
                      clientSchadule: makers.clientSchadule.map(client => {
                        return {
                          ...client,
                          foodSchadule: client.foodSchadule.map(food => {
                            return {...food, schaduleStatus: 2};
                          }),
                        };
                      }),
                    };
                  }),
                );
              }}>
              전체거절
            </Button>
          </AccessBox>
        </HeaderBox>
        {page ? (
          <CalendarDetail
            count={count}
            testData={testData}
            setTestData={setTestData}
          />
        ) : (
          <CalendarSimple testData={testData} setTestData={setTestData} />
        )}
      </Wrapper>
    </PageWrapper>
  );
};

export default Calendar;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 20px;
`;
const ViewTypeBox = styled.div``;
const AccessBox = styled.div``;
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  max-width: ${({page}) => (!page ? '1200px' : '1500px')};
  margin: 0px auto;
`;
const ExampleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SaveBox = styled.div``;
const SaveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: ${({page}) => (!page ? '1200px' : '1500px')};
  margin: 0px auto;
`;
const Arrow = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;
