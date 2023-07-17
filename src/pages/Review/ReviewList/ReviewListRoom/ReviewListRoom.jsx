import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import ReviewListEach from './ReviewListEach';

const ReviewListRoom = ({reviewList}) => {
  // console.log(reviewList);

  const myDivRef = useRef(null);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  useEffect(() => {
    const myDiv = myDivRef.current;
    const handleScroll = () => {
      const {clientHeight, scrollHeight} = myDiv;
      setIsScrollbarVisible(scrollHeight > clientHeight);
    };

    // Add event listener to div scroll
    myDiv.addEventListener('scroll', handleScroll);

    // Call handleScroll initially to check if scrollbar is visible
    handleScroll();

    // Remove event listener on unmount
    return () => myDiv.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container ref={myDivRef}>
      {reviewList.map((v, i) => {
        return <ReviewListEach key={i} data={v} />;
      })}
    </Container>
  );
};

export default ReviewListRoom;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  overflow-y: scroll;
  padding-right: 4px;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
  }
`;
