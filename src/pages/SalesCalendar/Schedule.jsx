import {useEffect, useRef, useState} from 'react';
import {Button, Header, Label, Select, Table} from 'semantic-ui-react';
import {Table as AntTable} from 'antd';

import styled, {css, useTheme} from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import DiningButton from './components/DiningButton';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import {useGetSalesList} from '../../hook/useSalesList';
import {maskingName} from '../../utils/maskingName';
import TestData from './test';
import {useAtom} from 'jotai';
import {pageWidthAtom, tabAtom} from '../../utils/store/store';
import withCommas from '../../utils/withCommas';
import {groupTypeFormatted} from '../../utils/statusFormatter';
import DeliveryCard from './components/DeliveryCard';
import DesktopMode from './components/DesktopMode';
import MobileMode from './components/MobileMode';
const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [innerWidth, setInnerWidth] = useAtom(pageWidthAtom);
  const [innerWidths, setInnerWidths] = useState(window.innerWidth);
  const [tab, setTab] = useAtom(tabAtom);
  const [startDate, setStartDate] = useState(day);
  const [endDate, setEndDate] = useState(day);
  const [diningSelect, setDiningSelect] = useState([0, 1, 2]);
  const intervalTime =
    formattedWeekDate(startDate) === formattedWeekDate(endDate);

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
  );

  // useEffect(() => {
  //   refetch();
  // }, [refetch, startDate, endDate, diningSelect]);
  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };
  
  useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
          // cleanup
          window.removeEventListener("resize", handleResize);
      };
  }, [handleResize]);
  useEffect(() => {
    if (intervalTime && tab === 0) {
      const interval = setInterval(() => {
        refetch();
      }, 20000);
      return () => {
        clearInterval(interval);
      };
    } else {
      refetch();
    }
  }, [intervalTime, refetch, startDate, endDate, tab]);
  return (
    <Wrapper innerWidths={window.innerWidth} isMobile={innerWidths < 768}>
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
