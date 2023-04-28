import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const ReviewImage = ({url, setShowImageModal}) => {
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
        onClick={() => {
          setShowImageModal(true);
        }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}>
        <Img src={url} alt="" isHorizontal={isHorizontal} />
      </Div>
    </>
  );
};
export default ReviewImage;

export const Div = styled.div`
  display: flex;

  height: 100px;
  width: 100px;
  position: relative;
  margin: 10px;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
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
