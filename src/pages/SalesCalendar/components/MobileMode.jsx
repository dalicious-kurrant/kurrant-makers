import {useState} from 'react';
import {Header} from 'semantic-ui-react';

import styled, {css} from 'styled-components';
import DeliveryTab from './DeliveryTab';
import PreparationTab from './PreparationTab';
import {useAtom} from 'jotai';
import {tabAtom} from '../../../utils/store/store';

const screenWidth = window.innerWidth;
const MobileMode = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  salesList,
  diningSelect,
  setDiningSelect,
  refetch,
}) => {
  const [tab, setTab] = useAtom(tabAtom);
  const [nowEndDate, setNowEndDate] = useState(new Date());

  const totalFood = salesList?.totalFoods;

  return (
    <MobileContainer>
      <Header style={{marginLeft: 24}} as="h2">
        주문 정보
      </Header>
      <TabContainer>
        <TabButton2 onClick={() => setTab(0)}>
          <TabButton isActive={tab === 0}>준비</TabButton>
        </TabButton2>
        <TabButton2 onClick={() => setTab(1)}>
          <TabButton isActive={tab === 1}>배송</TabButton>
        </TabButton2>
      </TabContainer>
      <TabContent>
        {tab === 0 ? (
          <PreparationTab
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            salesList={salesList}
            diningSelect={diningSelect}
            setDiningSelect={setDiningSelect}
            refetch={refetch}
          />
        ) : (
          <DeliveryTab
            salesList={salesList}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={nowEndDate}
            setEndDate={setNowEndDate}
          />
        )}
      </TabContent>
    </MobileContainer>
  );
};

export default MobileMode;

const MobileContainer = styled.div`
  padding-top: 10%;
  width: 100%;
`;
const TabContent = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  background-color: white;
`;
const TabButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 15px;
  ${({isActive}) => {
    if (isActive) {
      return css`
        border-bottom: ${({theme}) => `2px solid ${theme.colors.grey[2]}`};
        font-family: 'Pretendard-SemiBold';
        font-weight: 600;
      `;
    }
    return css`
      font-weight: 400;
    `;
  }}

  justify-content: center;
  text-align: center;
  align-items: center;
`;
const TabButton2 = styled.div`
  flex: 1;
`;
const TabContainer = styled.div`
  display: flex;
  width: ${screenWidth}px;
  justify-content: center;
  height: 43px;
`;
