import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const ReviewListEachImage = ({url}) => {
  const [onHover, setOnHover] = useState(false);
  const divRef = useRef(null);

  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = function () {
      const isHorizontal = this.width > this.height;
      if (isHorizontal) {
        setIsHorizontal(true);
      } else {
        setIsHorizontal(false);
      }
    };
    img.src = url;
  }, [url]);

  return (
    <>
      <Div
        ref={divRef}
        // divRef={divRef}
        url={!!url}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        {!!url && <Img src={url} alt="" isHorizontal={isHorizontal} />}

        {/* <Img src={imageSample} alt="" isHorizontal={isHorizontal} /> */}
      </Div>
    </>
  );
};
export default ReviewListEachImage;

export const Div = styled.div`
  display: flex;

  height: 105px;
  width: 105px;
  position: relative;
  margin: 2px;
  align-items: center;
  justify-content: center;

  /* border: 1px solid black; */
  overflow: hidden;
  border-radius: 6px;
  /* background-color: grey; */
  ${({url}) => {
    if (!url) {
      return `background-color: #E4E3E7`;
    }
  }}
`;

export const Img = styled.img`
  ${({isHorizontal}) => {
    if (isHorizontal) {
      return `height: 100%;`;
    } else {
      return `width: 100%;`;
    }
  }}
  margin: auto;
`;
