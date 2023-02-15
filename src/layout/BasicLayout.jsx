import styled from 'styled-components';
import NavBar from '../component/Gnb/Navbar';
import Sidebar from '../component/Snb/Sidebar';

const Component = () => {
  return (
    <div>
      <InnerWrapper>
        <Sidebar />
      </InnerWrapper>
    </div>
  );
};

export default Component;

const InnerWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow-x: scroll;
`;
