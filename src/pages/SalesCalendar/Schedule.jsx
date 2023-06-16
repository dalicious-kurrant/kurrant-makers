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
import {pageWidthAtom} from '../../utils/store/store';
import withCommas from '../../utils/withCommas';
import {groupTypeFormatted} from '../../utils/statusFormatter';
import DeliveryCard from './components/DeliveryCard';
import DesktopMode from './components/DesktopMode';
import MobileMode from './components/MobileMode';

const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [innerWidth, setInnerWidth] = useAtom(pageWidthAtom);
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
  );

  useEffect(() => {
    refetch();
  }, [refetch, startDate,diningSelect]);

  return (
    <Wrapper isMobile={innerWidth < 768}>
      {innerWidth > 768 ? (
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
  width: 100%;
  ${({isMobile}) => {
    if (!isMobile)
     return css`
        padding: 40px;
        min-width: 1024px;
      `;
   
  }}
`;
