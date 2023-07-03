import styled, {css} from 'styled-components';
import DeliveryCalendar from './DeliveryCalendar';
import {useState} from 'react';
import {useEffect} from 'react';
import {formattedWeekDate} from '../../../utils/dateFormatter';
import {diningFormatted} from '../../../utils/statusFormatter';
import DeliveryMobileCard from './DeliveryMobileCard';

const DeliveryTab = ({
  startDate,
  setStartDate,
  setEndDate,
  salesList,
}) => {
  const [diningType, setDiningTpye] = useState(0);
  const [data, setData] = useState();
  const [time, setTime] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState([]);

  const [nowDate, setNowDate] = useState(new Date());
  const selcetDiningType = dining => {
    setDiningTpye(dining);
  };
  const handleTimeFilter = t => {
    if (time.includes(t)) {
      
      return setTime(time.filter(ti => ti !== t));
    }
    return setTime([...time, t]);
  };
  const hadleAllTimeFilter = () => {
    if (deliveryTime?.length === time?.length) {
      return setTime([]);
    }
    if (deliveryTime?.length !== time?.length) {
      return setTime(deliveryTime);
    }
  };
  useEffect(() => {
    const salesData = salesList.deliveryGroupsByDates.filter(
      v => v.serviceDate === formattedWeekDate(nowDate),
    );
    setData(salesData);
    setDeliveryTime(
      ...salesData.map(v => {
        if (v.diningType === diningFormatted(diningType) || diningType === 0)
          return v.deliveryGroups.map(group => group.deliveryTime);
      }),
    );
    setTime(
      ...salesData.map(v => {
        if (v.diningType === diningFormatted(diningType) || diningType === 0)
          return v.deliveryGroups.map(group => group.deliveryTime);
      }),
    );
  }, [diningType, nowDate, salesList]);
  return (
    <DeliveryTabContainer>
      <CalendarBox>
        <DeliveryCalendar
          startDate={nowDate}
          setStartDate={setNowDate}
          setEndDate={setNowDate}
        />
      </CalendarBox>
      <DiningBox>
        <Dining onClick={() => selcetDiningType(0)} isActive={diningType === 0}>
          전체
        </Dining>
        <Dining onClick={() => selcetDiningType(1)} isActive={diningType === 1}>
          아침
        </Dining>
        <Dining onClick={() => selcetDiningType(2)} isActive={diningType === 2}>
          점심
        </Dining>
        <Dining onClick={() => selcetDiningType(3)} isActive={diningType === 3}>
          저녁
        </Dining>
      </DiningBox>
      <TimeBox>
        <Time
          isActive={deliveryTime?.length === time?.length}
          onClick={() => {
            hadleAllTimeFilter();
          }}>
          전체
        </Time>
        {deliveryTime?.map((t, i) => {
          return (
            <Time
              isActive={time.includes(t)}
              key={i}
              onClick={() => handleTimeFilter(t)}>
              {t}
            </Time>
          );
        })}
      </TimeBox>
      <Line />
      <DeliveryMobileCardList>
        {data?.length > 0 &&
          data.map(delivery => {
            return delivery?.deliveryGroups.map(group => {
              if (
                (delivery.diningType === diningFormatted(diningType) ||
                  diningType === 0) &&
                time?.includes(group.deliveryTime)
              )
                return (
                  <DeliveryMobileCard
                    key={
                      delivery.serviceDate +
                      delivery.diningType +
                      delivery.spotCount +
                      group.deliveryTime
                    }
                    group={group}
                    delivery={delivery}
                  />
                );
            });
          })}
      </DeliveryMobileCardList>
    </DeliveryTabContainer>
  );
};

export default DeliveryTab;

const DeliveryTabContainer = styled.div`
  flex: 1;
  width: ${window.innerWidth}px;
`;
const DeliveryMobileCardList = styled.div`
  margin-top: 16px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${window.innerWidth}px;
`;
const CalendarBox = styled.div`
  margin-top: 16px;
  padding-left: 24px;
  padding-right: 24px;
  width: ${window.innerWidth}px;
`;
const DiningBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-left: 24px;
  color :${({theme})=> theme.colors.grey[2]};
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-left: 24px;
  overflow: auto;
  flex-wrap: nowrap;
  margin-bottom: 8px;
  box-sizing: border-box;
  width: ${window.innerWidth}px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Dining = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
  margin-right: 16px;
  padding-bottom: 4px;
  font-family: 'Pretendard-Regular';
  color :${({theme})=> theme.colors.grey[2]};
  font-size: 15px;
  ${({isActive}) => {
    if (isActive) {
      return css`
        font-weight: 600;
        font-family: 'Pretendard-SemiBold';
        border-bottom: 2px solid ${({theme}) => theme.colors.grey[2]};
      `;
    }
    return css`
      font-weight: 400;
      border-bottom: 2px solid ${({theme}) => theme.colors.grey[0]};
    `;
  }}
`;
const Line = styled.div`
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  margin-top: 8px;
  margin-bottom: 8px;
`;
const Time = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 50px;
  padding: 6.5px 12px;
  overflow: visible;
  cursor: pointer;
  margin-right: 8px;
  padding-bottom: 4px;
  white-space: nowrap;
  font-family: 'Pretendard-SemiBold';
  font-size: 15px;
  ${({isActive}) => {
    if (isActive) {
      return css`
        font-weight: 600;
        background-color: ${({theme}) => theme.colors.grey[2]};
        color: ${({theme}) => theme.colors.grey[0]};
      `;
    }
    return css`
      font-weight: 600;
      background-color: ${({theme}) => theme.colors.grey[8]};
      color: ${({theme}) => theme.colors.grey[5]};
    `;
  }}
`;
