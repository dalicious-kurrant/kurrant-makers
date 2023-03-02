import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Label, Pagination} from 'semantic-ui-react';
import {PageWrapper} from '../../layout/common.style';
import CalendarDetail from './components/CalendarDetail';
import CalendarSimple from './components/CalendarSimple';
import {QueryClient, useQuery} from 'react-query';
import {calendarApis} from '../../api/calendar';

const Calendar = () => {
  // const {data: makersCalendar} = useGetCalendarList();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(false);
  const [group, setGroupAccess] = useState([{}]);
  const [foodAct, setFoodAct] = useState([{}]);
  const [testData, setTestData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumbeer, setPageNumber] = useState(1);
  const {
    data,
    isLoading,
    refetch: calendarFetch,
  } = useQuery('calendar', () =>
    calendarApis.getCalendarList(2000, pageNumbeer),
  );
  useEffect(() => {
    if (data) {
      console.log(data);
      setTestData(data?.data?.data?.items);
      setTotalPage(data.data.data.total);
    }
  }, [data]);
  useEffect(() => {
    calendarFetch();
  }, [pageNumbeer]);
  useEffect(() => {
    const groupAccess = [];
    const foodAccess = [];
    if (testData) {
      setCount(
        testData.map((v, i) => {
          const test = v.clientSchedule.map((s, si) => {
            return s.foodSchedule.length;
          });
          const result = test.reduce((a, b) => Number(a) + Number(b));
          return result;
        }),
      );
      testData.map(groupData => {
        groupAccess.push({
          presetMakersId: groupData.presetMakersId,
          scheduleStatus: groupData.scheduleStatus,
        });
        return groupData.clientSchedule.map(client => {
          return client.foodSchedule.map(food => {
            return foodAccess.push({
              presetFoodId: food.presetFoodId,
              scheduleStatus: food.scheduleStatus,
            });
          });
        });
      });
      setGroupAccess(groupAccess);
      setFoodAct(foodAccess);
    }
  }, [testData]);
  if (isLoading) {
    return (
      <>
        <div>로딩중</div>
      </>
    );
  }
  console.log(testData);
  return (
    <PageWrapper>
      <Wrapper>
        <TitleBox>일정관리</TitleBox>
        <SaveContainer page={page}>
          <ExampleBox>
            <Button color="grey">요청</Button>
            <Arrow>{`->`}</Arrow>
            <Button color="green">승인</Button>
            <Arrow>{`->`}</Arrow>
            <Button color="red">거절</Button>
          </ExampleBox>
          <SaveBox>
            {testData[0]?.deadline && (
              <DeadLineBox size="big" style={{marginRight: 10}}>
                마감날짜 : {testData[0]?.deadline}
              </DeadLineBox>
            )}
            <Button
              toggle
              color={'twitter'}
              active={false}
              size={'large'}
              onClick={async () => {
                const req = {
                  makersScheduleDtos: group,
                  foodScheduleDtos: foodAct,
                };
                await calendarApis.accessHandler(req);
                alert('저장되었습니다.');
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
          {totalPage > 0 && (
            <PagenationBox>
              <Pagination
                defaultActivePage={pageNumbeer}
                totalPages={totalPage}
                boundaryRange={1}
                onPageChange={(e, data) => {
                  setPageNumber(data.activePage);
                }}
              />
            </PagenationBox>
          )}
          <AccessBox>
            <Button
              toggle
              color={'green'}
              active={false}
              size={'large'}
              onClick={() => {
                console.log();
                setTestData(
                  data?.data?.data?.items?.map(makers => {
                    console.log(makers);
                    return {
                      ...makers,
                      scheduleStatus: 1,
                      clientSchedule: makers.clientSchedule.map(client => {
                        return {
                          ...client,
                          foodSchedule: client.foodSchedule.map(food => {
                            return {...food, scheduleStatus: 1};
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
                  data?.data?.data?.items?.map(makers => {
                    return {
                      ...makers,
                      scheduleStatus: 2,
                      clientSchedule: makers.clientSchedule.map(client => {
                        return {
                          ...client,
                          foodSchedule: client.foodSchedule.map(food => {
                            return {...food, scheduleStatus: 2};
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
        {testData.length > 0 && page ? (
          <CalendarDetail
            count={count}
            testData={testData}
            setTestData={setTestData}
          />
        ) : (
          testData.length > 0 && (
            <CalendarSimple testData={testData} setTestData={setTestData} />
          )
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
const DeadLineBox = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 5px;
  border: 1px solid #ededed;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;
const SaveBox = styled.div`
  display: flex;
`;
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
const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
