import {Button} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedWeekDate} from '../../../utils/dateFormatter';
import {useState} from 'react';
import DiningButton from './DiningButton';
import DiningMobileButton from './DiningMobileButton';
import MobileDeliveryTotalCard from './MobileDeliveryTotalCard';

const PreparationTab = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  salesList,
  refetch,
  diningSelect, 
  setDiningSelect
}) => {
  

  const getStartDate = e => {
    setStartDate(new Date(e.target.value));
  };
  const getEndDate = e => {
    setEndDate(new Date(e.target.value));
  };
  const loadButton = () => {
    refetch();
  };
  return (
    <PreparationTabContainer>
      <FilterWrap>
        <CalendarWrap>
          <CalendarBox>
            <DateInput
              type="date"
              defaultValue={formattedWeekDate(startDate)}
              onChange={e => getStartDate(e)}
            />
            <DateSpan>-</DateSpan>
            <DateInput
              type="date"
              defaultValue={formattedWeekDate(endDate)}
              onChange={e => getEndDate(e)}
            />
          </CalendarBox>
          <ButtonWrap>
            <Button style={{flexWrap:'nowrap' ,whiteSpace:'nowrap'}} content="조회" basic size="tiny" onClick={loadButton} />
          </ButtonWrap>
        </CalendarWrap>
        <DiningWrap>
          <DiningMobileButton touch={diningSelect} setTouch={setDiningSelect} />
        </DiningWrap>
      </FilterWrap>
      <ContentsWrap>
        <Titlebar>
          <TitleText>상품명 및 상세정보</TitleText>
          <TitleCount>합계(개)</TitleCount>
        </Titlebar>
        {salesList?.totalFoods?.map((el, i) => {
          return (
            <TableContent key={el.foodId}>
              <ContentBpx>
                <ContentText>{el.foodName}</ContentText>
                <ContentDetailText>{el.description}</ContentDetailText>
              </ContentBpx>
              <ContentCount>{el.totalFoodCount}</ContentCount>
            </TableContent>
          );
        })}
        {/* <TableContent>
            <ContentBpx>
                <ContentText>[WEIGHT LOSS] Sous vide Chicken Breast 110g AND Sweet pumpkin 120g</ContentText>
                <ContentDetailText>허니갈릭새우, 베이컨 김치, 기본유부초밥X2</ContentDetailText>
            </ContentBpx>
            <ContentCount>345</ContentCount>
        </TableContent> */}
      </ContentsWrap>
      <ContentsDetailWrap>
        {salesList?.foodByDateDiningTypes.map(food => {
          return (
            <MobileDeliveryTotalCard
              key={food.foods.map(f => f.foodId).join('')}
              food={food}
            />
          );
        })}
      </ContentsDetailWrap>
    </PreparationTabContainer>
  );
};

export default PreparationTab;

const PreparationTabContainer = styled.div`
  flex: 1;
  width: ${window.innerWidth}px;
`;

const DateInput = styled.input`
  padding: 4px;
  font-size: 13px;
  font-family: 'Pretendard-SemiBold';
  height: 36px;
  color:${({theme}) => theme.colors.grey[2]};
  border-radius: 4px;
  border: 1px solid #bdbac1;
`;
const ContentsDetailWrap = styled.div`
  width: ${window.innerWidth}px;
  margin-bottom: 64px;
`;
const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin: 24px 0;
  padding: 0px 24px;
  justify-content: space-between;
  width: ${window.innerWidth}px;
`;
const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`
const DiningWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  justify-self: flex-start;
  padding: 0px 24px;
  padding-bottom: 24px;
`;
const TitleText = styled.div`
  font-size: 13px;
`;
const TitleCount = styled.div`
  font-size: 13px;
`;
const ContentBpx = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({theme}) => theme.colors.grey[8]};
  flex: 1;
  align-items: flex-start;
  padding-left: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
`;
const ContentText = styled.div`
  font-size: 14px;
  width: 245px;
  /* white-space: nowrap; */
  font-family: 'Pretendard-SemiBold';
  font-weight: 600;
  margin-right: 8px;
`;
const ContentDetailText = styled.div`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({theme}) => theme.colors.grey[4]};
  width: 245px;
  font-weight: 400;
  margin-top: 4px;
`;
const ContentCount = styled.div`
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
  font-weight: 600;
  padding-top: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: 24px;
  width: 90px;
`;
const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: ${window.innerWidth}px;
`;
const ContentsWrap = styled.div`
  width: ${window.innerWidth}px;
  padding-bottom: 40px;
`;
const Titlebar = styled.div`
  padding: 16px 24px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  display: flex;
  justify-content: space-between;
`;
const TableContent = styled.div`
  background-color: ${({theme}) => theme.colors.grey[0]};
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.grey[8]};
  border-top: 0px;
`;
const DateSpan = styled.span`
  margin: 0px 4px;
`;
const ButtonWrap = styled.div`
  margin-left: 10px;
`;
