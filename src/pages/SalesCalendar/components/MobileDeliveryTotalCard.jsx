import styled from "styled-components"
import { formattedMonthDate } from "../../../utils/dateFormatter";

const MobileDeliveryTotalCard = ({food})=>{
    return <Wrap>
        <HeaderWrap>
            <DateText>{formattedMonthDate(food.serviceDate)+'•'+food.diningType}</DateText>
            <TotalCount>총 {food.totalCount}개</TotalCount>
        </HeaderWrap>
        {food.foods.map((f)=>{
            return <FoodWrap key={f.foodId}>
            <FoodName>{f.foodName}</FoodName>
            <FoodCount>{f.foodCount} 개</FoodCount>
        </FoodWrap>
        })}
    </Wrap>
}
export default MobileDeliveryTotalCard;
const Wrap = styled.div`
    flex: 1;
    margin-bottom: 16px;
`
const HeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 24px;
    margin-left: 24px;
    padding-bottom: 8px;
    padding-top: 8px;
    color :${({theme})=> theme.colors.grey[3]};
    border-bottom: 1px solid ${({theme})=> theme.colors.grey[7]};
` 
const DateText = styled.div`
    font-size: 14px;
    font-weight: 400;
    font-family: 'Pretendard';
`
const TotalCount = styled.div`
    font-size: 14px;
    font-weight: 400;
    font-family: 'Pretendard';
`
const FoodWrap =styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Pretendard';
    align-items: flex-start;
    color :${({theme})=> theme.colors.grey[2]};
    padding: 16px 24px;
`
const FoodName = styled.div`
    font-weight: 600;
    font-size: 18px;
    width: 260px;
    font-family: 'Pretendard';

`
const FoodCount = styled.div`
    font-weight: 600;
    font-size: 18px;
    font-family: 'Pretendard';

`