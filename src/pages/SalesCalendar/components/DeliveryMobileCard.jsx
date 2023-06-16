import styled, {css} from 'styled-components';
import downArrow from '../../../assets/icon/downArrow.svg';
import {useState} from 'react';
const DeliveryMobileCard = ({delivery, group}) => {
  const [rotation, setRotation] = useState(true);
  return (
    <Container>
      <Wrap>
        <TotalWrap>
          <TotalSpot>총 {group.spotCount}개 배송스팟</TotalSpot>
          <DiningTime>
            <TotalSpot>
              {delivery.diningType} {group.deliveryTime}
            </TotalSpot>
            <IconBox
              rotation={rotation}
              onClick={() => {
                setRotation(!rotation);
              }}>
              <ArrowIcon src={downArrow} />
            </IconBox>
          </DiningTime>
        </TotalWrap>
        {rotation && (
          <>
            {group.foods.map(food => {
              return (
                <TotalFoodWrap key={food.foodId}>
                  <TotalSpot>{food.foodName}</TotalSpot>
                  <DiningTime>{food.foodCount} 개</DiningTime>
                </TotalFoodWrap>
              );
            })}
          </>
        )}
      </Wrap>
      <FoodDetailWrap>
        {group.foodBySpots.map((spot,i) => {
            console.log(spot)
          return (
            <FoodSpotWrap key={spot.deliveryId+spot.pickUpTime+i}>
              <FoodDetailTitleWrap>
                <FoodDetailTitle spot={spot.spotType}>배송번호 : {spot.deliveryId}</FoodDetailTitle>
                <FoodDetailPickUpTime>예상 픽업 {spot.pickUpTime}</FoodDetailPickUpTime>
              </FoodDetailTitleWrap>
              {spot.foods.map(food => {
                return (
                  <DetailFoodWrap key={food.foodId}>
                    <TotalSpot>{food.foodName}</TotalSpot>
                    <DiningTime>{food.foodCount} 개</DiningTime>
                  </DetailFoodWrap>
                );
              })}
            </FoodSpotWrap>
          );
        })}
      </FoodDetailWrap>
    </Container>
  );
};

export default DeliveryMobileCard;
const Container = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-bottom: 40px;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  padding-top: 14px;
  padding-right: 8px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  border-radius: 8px;
`;

const TotalWrap = styled.div`
  color: ${({theme}) => theme.colors.grey[3]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-family: 'Pretendard-Regular';
  font-weight: 400;
`;
const TotalSpot = styled.div`
  max-width: 245px;
`;
const DiningTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TotalFoodWrap = styled.div`
  color: ${({theme}) => theme.colors.grey[2]};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 13px;
  font-family: 'Pretendard-Regular';
  font-weight: 600;
  margin-top: 8px;
  padding-right: 8px;
`;
const DetailFoodWrap = styled.div`
  color: ${({theme}) => theme.colors.grey[2]};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  font-weight: 400;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 8px;
`;
const ArrowIcon = styled.img`
  width: 100%;
  height: 100%;
`;
const IconBox = styled.button`
  transform: ${({rotation}) => (!rotation ? `rotate(180deg)` : `rotate(0deg)`)};
  transition: 'transform 0.3s ease';
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
`;
const FoodDetailWrap = styled.div``;
const FoodDetailTitleWrap = styled.div`
    display: flex;
    align-items: center;
`;
const FoodDetailTitle = styled.div`
    margin-right: 8px;
    color: ${({theme, spot})=> spot===0 ? theme.colors.blue[500]:theme.colors.pink[500]};
    font-size: 13px;
    font-weight: 600;
`;
const FoodDetailPickUpTime = styled.div`
    color: ${({theme})=>theme.colors.grey[4]};
    font-size: 12px;
    letter-spacing: -0.5px;
`;
const FoodSpotWrap = styled.article`
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px solid ${({theme})=>theme.colors.grey[8]};
`;
