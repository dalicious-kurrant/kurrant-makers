import styled from 'styled-components';
import {ReactComponent as Logo} from '../../assets/icon/mainLogo.svg';

const NavBar = () => {
  return (
    <Wrapper>
      <Container>
        <Logo />
      </Container>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  background-color: #000046;
  width: 100vw;
  height: 60px;
  position: fixed;
  z-index: 999;
`;

const Container = styled.div`
  padding: 18px 24px;
`;
