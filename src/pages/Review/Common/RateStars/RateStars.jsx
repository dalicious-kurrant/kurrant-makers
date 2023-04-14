import React, {useEffect, useState} from 'react';

import styled from 'styled-components';

import {splitNumberAndUnit} from './logic';

import YellowStar from '../../../../assets/img/StarRating/YellowStar.png';
import GreyStar from '../../../../assets/img/StarRating/GreyStar.png';

const RateStars = ({
  ratingInput = 0,
  disableButton = true,
  width = '80px',
  margin = '1px',

  callback,
}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (ratingInput) {
      setRating(ratingInput);
    }
  }, [ratingInput]);

  const {number: widthNum, unit: unitWidth} = splitNumberAndUnit(width);
  const {number: marginNum, unit: unitMargin} = splitNumberAndUnit(margin);

  const widthWithoutMargin = widthNum - 10 * marginNum;

  const widthAndHeight = `${widthWithoutMargin / 5}${unitWidth}`;

  return (
    <>
      <Container>
        <GreyStarDiv>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(1);
              callback && callback(1);
            }}>
            <StarIconImage src={GreyStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(2);

              callback && callback(2);
            }}>
            <StarIconImage src={GreyStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(3);

              callback && callback(3);
            }}>
            <StarIconImage src={GreyStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(4);

              callback && callback(4);
            }}>
            <StarIconImage src={GreyStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(5);

              callback && callback(5);
            }}>
            <StarIconImage src={GreyStar} />
          </StarPressable>
        </GreyStarDiv>

        {/* 6번째 */}

        <YellowStarDiv rating={rating} width={widthNum} unit={unitWidth}>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(1);

              callback && callback(1);
            }}>
            <StarIconImage src={YellowStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(2);

              callback && callback(2);
            }}>
            <StarIconImage src={YellowStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(3);

              callback && callback(3);
            }}>
            <StarIconImage src={YellowStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(4);

              callback && callback(4);
            }}>
            <StarIconImage src={YellowStar} />
          </StarPressable>
          <StarPressable
            width={widthAndHeight}
            height={widthAndHeight}
            margin={marginNum}
            unitMargin={unitMargin}
            disabled={disableButton}
            onClick={() => {
              setRating(5);

              callback && callback(5);
            }}>
            <StarIconImage src={YellowStar} />
          </StarPressable>
        </YellowStarDiv>
      </Container>
    </>
  );
};

export default RateStars;

const Container = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 5px;
`;

const GreyStarDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
`;

const YellowStarDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({rating, width, unit}) => `${(rating / 5) * width}${unit}`};
  overflow: hidden;

  position: absolute;
  left: 0;
  top: 0;
`;
const StarPressable = styled.button`
  width: ${({width}) => width};
  height: ${({height}) => height};
  flex: 0 0 auto;
  margin: ${({margin, unitMargin}) => `${margin}${unitMargin}`};

  outline: 0;
  cursor: pointer;
  border: 0;
  background-color: transparent;

  justify-content: center;
  padding: 0;
`;

const StarIconImage = styled.img`
  width: 100%;
  height: 100%;
`;
