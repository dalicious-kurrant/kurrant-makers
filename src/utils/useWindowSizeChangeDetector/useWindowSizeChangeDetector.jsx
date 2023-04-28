import {useEffect, useState} from 'react';

const useWindowSizeChangeDetector = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [widthDetect, setWidthDetect] = useState(window.innerWidth);
  const [widthIsIncreasing, setWidthIsIncreasing] = useState(undefined);

  const handleResize = () => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight});
  };

  useEffect(() => {
    if (Math.abs(widthDetect - windowSize.width) > 0.1) {
      setWidthDetect(windowSize.width);
      setWidthIsIncreasing(widthDetect - windowSize.width < 0);
    }
  }, [windowSize.width]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
    widthIsIncreasing,
  };
};
export default useWindowSizeChangeDetector;
