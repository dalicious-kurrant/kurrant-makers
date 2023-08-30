import styled from 'styled-components';
import {
  formattedMonthDate,
  formattedWeekDateTime,
} from '../../../utils/dateFormatter';

const MobileDeliveryTotalCard = ({food}) => {
  return (
    <Wrap>
      <HeaderWrap>
        <ServiceDateContainer>
          <DateText>
            {formattedMonthDate(food.serviceDate) + '•' + food.diningType}
          </DateText>
          <DeadLineBox
            status={
              new Date(food.lastOrderTime).getTime() < new Date().getTime()
            }>
            {new Date(food.lastOrderTime).getTime() < new Date().getTime()
              ? '주문마감'
              : '주문진행중'}
          </DeadLineBox>
          <DeadLineText>
            주문 마감 {formattedWeekDateTime(new Date(food.lastOrderTime))}
          </DeadLineText>
        </ServiceDateContainer>
        <TotalCount>총 {food.totalCount}개</TotalCount>
      </HeaderWrap>
      {food.foods.map(f => {
        return (
          <FoodWrap key={f.foodId}>
            <FoodName>{f.foodName}</FoodName>
            <FoodCount>{f.foodCount} 개</FoodCount>
          </FoodWrap>
        );
      })}
    </Wrap>
  );
};
export default MobileDeliveryTotalCard;
const Wrap = styled.div`
  flex: 1;
  margin-bottom: 16px;
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 24px;
  margin-left: 24px;
  padding-bottom: 8px;
  padding-top: 8px;
  color: ${({theme}) => theme.colors.grey[3]};
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[7]};
`;
const ServiceDateContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DeadLineBox = styled.div`
  background-color: #eee;
  color: ${({theme, status}) =>
    status ? theme.colors.red[500] : theme.colors.blue[500]};
  font-size: 8px;
  font-weight: 600;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 10px;
  margin-left: 10px;
`;
const DeadLineText = styled.div`
  font-size: 8px;
  font-weight: 600;
  margin-left: 10px;
`;
const DateText = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-family: 'Pretendard-Regular';
`;
const TotalCount = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-family: 'Pretendard-Regular';
`;
const FoodWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: ${({theme}) => theme.colors.grey[2]};
  padding: 16px 24px;
  font-family: 'Pretendard-SemiBold';
`;

const FoodName = styled.div`
  font-weight: 600;
  font-size: 18px;
  width: 260px;
`;
const FoodCount = styled.div`
  font-weight: 600;
  font-size: 18px;
`;
