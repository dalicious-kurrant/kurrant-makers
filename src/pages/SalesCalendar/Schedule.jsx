import {useEffect, useState} from 'react';

import styled, {css} from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import {useGetSalesList} from '../../hook/useSalesList';
import {useAtom} from 'jotai';
import {pageWidthAtom, tabAtom} from '../../utils/store/store';
import DesktopMode from './components/DesktopMode';
import MobileMode from './components/MobileMode';
import subscribeToSSE from '../../utils/sse/subscribeToSSE';
const Schedule = () => {
  const day = new Date();
  const [innerWidth, setInnerWidth] = useAtom(pageWidthAtom);
  const [innerWidths, setInnerWidths] = useState(window.innerWidth);
  const [notification, setNotification] = useState(null);

  const [eventSource, setEventSource] = useState(null);
  const [tab, setTab] = useAtom(tabAtom);
  const [startDate, setStartDate] = useState(day);
  const [endDate, setEndDate] = useState(day);
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
  const {data: salesList, refetch} = useGetSalesList(
    formattedWeekDate(startDate),
    formattedWeekDate(endDate),
    types,
    tab
  );

  const handleResize = () => {
    setInnerWidths(window.innerWidth);
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    if (!eventSource) {
      subscribeToSSE((data) => {        
        // 여기서 필요한 알림을 처리하거나 상태를 업데이트할 수 있습니다.
        console.log("sse통신",data)
        refetch();
      },eventSource,
      setEventSource);
    }

    return () => {
      if (eventSource) {
        eventSource.close(); // Clean up the EventSource when component unmounts
        setEventSource(null);
      }
    };
  }, [eventSource, refetch]);

  useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
          // cleanup
          window.removeEventListener("resize", handleResize);
      };
  }, []);
 
  return (
    <Wrapper innerWidths={innerWidths} isMobile={innerWidths < 768}>
      {innerWidths > 768 ? (
        <DesktopMode
          endDate={endDate}
          setEndDate={setEndDate}
          startDate={startDate}
          setStartDate={setStartDate}
          diningSelect={diningSelect}
          setDiningSelect={setDiningSelect}
          salesList={salesList?.data?.data}
          refetch={refetch}
        />
      ) : (
        <MobileMode
          endDate={endDate}
          setEndDate={setEndDate}
          startDate={startDate}
          diningSelect={diningSelect}
          setDiningSelect={setDiningSelect}
          setStartDate={setStartDate}
          salesList={salesList?.data?.data}
          refetch={refetch}
        />
      )}
    </Wrapper>
  );
};

export default Schedule;

const Wrapper = styled.div`
  padding-top: 40px;
  ${({isMobile}) => {
    if (!isMobile)
      return css`
        width: ${({innerWidths})=> `${innerWidths-300}px`};
      `;
  }}
`;
