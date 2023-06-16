import styled, { css } from "styled-components";
import { groupTypeFormatted } from "../../../utils/statusFormatter";
import withCommas from "../../../utils/withCommas";

const DeliveryCard =({spot})=>{
    const spotContentsText = (text1, text2) => {
        return (
          <ContentsDetailLabelWrap>
            <ContentsDetailLabel>{text1} :</ContentsDetailLabel>
            <ContentsDetailLabel2>{text2}</ContentsDetailLabel2>
          </ContentsDetailLabelWrap>
        );
      };
    return <TableWrap >
    <TableBox>
      <LabelWrap>
        <SpotLabel spot={spot.spotType}>
          {groupTypeFormatted(spot.spotType)}
        </SpotLabel>
        <TitleIdLabel
          spot={
            spot.spotType
          }>{`배송 번호: ${spot.deliveryId} `}</TitleIdLabel>
        {spot.pickUpTime &&
          spotContentsText(
            '예상 픽업',
            spot.pickUpTime,
          )}
      </LabelWrap>
      <Line />
      {spot.foods.map((food) => {
        return (
          <TotalFoodItems2 key={food.foodId}>
            <FoodItemName2>
              {food.foodName}
            </FoodItemName2>
            <FoodCount2>
              {food.foodCount} 개
            </FoodCount2>
          </TotalFoodItems2>
        );
      })}
      <TotalSpotFoodItem>
        <FoodItemName2>총 수량</FoodItemName2>
        <FoodCount2>
          {withCommas(spot.foodCount)} 개
        </FoodCount2>
      </TotalSpotFoodItem>
    </TableBox>
  </TableWrap>
}

export default DeliveryCard;


const TotalFoodItems2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 400;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const TotalSpotFoodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding-top: 12px;
`;
const FoodItemName2 = styled.div`
  max-width: 215px;
`;
const FoodCount2 = styled.div`
  flex-wrap: nowrap;
  white-space: nowrap;
`;
const Line = styled.div`
  height: 1px;
  background-color: #f5f5f5;
  margin-top: 16px;
  margin-bottom: 12px;
  width: 100%;
`;









const TableWrap = styled.div`
  display: flex;
  max-width: 306px;
  padding: 24px;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
`;


const LabelWrap = styled.div`
  min-width: 250px;
`;
const SpotLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
  padding: 2px 4px;
  letter-spacing: -0.5px;
  border-radius: 4px;
  ${({spot, theme}) => {
    if (spot === 0)
      return css`
        color: ${theme.colors.blue[500]};
        background-color: ${theme.colors.blue[100]};
      `;
    return css`
      color: ${theme.colors.pink[500]};
      background-color: ${theme.colors.pink[100]};
    `;
  }}
`;
const TitleIdLabel = styled.div`
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  font-weight: 600;

  color: ${({spot, theme}) =>
    spot === 0 ? theme.colors.blue[500] : theme.colors.pink[500]};
`;
const ContentsDetailLabel = styled.div`
  display: flex;
  white-space: nowrap;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 600;
  color: #343337;
`;
const ContentsDetailLabel2 = styled.div`
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-weight: 600;
  color: #343337;
`;
const ContentsDetailLabelWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const TableBox = styled.div`
  margin-right: 10px;
  margin-top: 12px;
`;
