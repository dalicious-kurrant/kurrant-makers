import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../../assets/logo3.png';
import {menuData} from './headerdata';
import {useAtom} from 'jotai';
import {pageWidthAtom} from '../../utils/store/store';
import {MenuOutlined} from '@ant-design/icons';
import {Dropdown} from 'semantic-ui-react';
function Header() {
  const [innerWidth] = useAtom(pageWidthAtom);
  const [open, setOpen] = useState(false);
  const navigation = useNavigate();
  const logoutButton = () => {
    localStorage.clear();
    window.location.replace('/');
  };
  return (
    <Wrapper innerWidth={innerWidth}>
      <ImageWrap>
        <img src={Logo} alt="logo" width={85} height={24} />
      </ImageWrap>
      <MenuBox>
        <MenuOutlined
          style={{fontSize: 24}}
          color={'white'}
          onClick={() => {
            setOpen(!open);
          }}
        />
      </MenuBox>
      {open && (
        <MenuContainer>
          {menuData.map((menu, index) => {
            return (
              <MenuItem
                key={menu.key}
                onClick={() => {
                  setOpen(!open);
                  navigation(menu.path);
                }}>
                <MenuIcon>{menu.icon}</MenuIcon>
                <MenuText>{menu.key}</MenuText>
              </MenuItem>
            );
          })}
          <MenuItem
                onClick={() => {
                  setOpen(!open);
                  logoutButton();
                }}>
                  <MenuIcon style={{marginRight:24}}></MenuIcon>
                <MenuText>로그아웃</MenuText>
              </MenuItem>
        </MenuContainer>
      )}
      {/* <ul style={{paddingLeft: 8}}>
        {menuData.map((menu, index) => {
          return (
            <StyleNavLink
              to={menu.path}
              key={index}
              className={({isActive}) => (isActive ? 'active' : undefined)}>
              <SidebarItem
                menu={menu}
                isActive={pathName === menu.path ? true : false}
              />
            </StyleNavLink>
          );
        })}
      </ul> */}
      {/* <BottomIconWrap>
        <a
          href="http://pf.kakao.com/_uAxixjxb/chat"
          target="_blank"
          rel="noreferrer">
          <CsWrap>
            <div>고객센터</div>
            <CsIcon />
          </CsWrap>
        </a>
        <BottomIcon onClick={logoutButton}>
          <div>로그아웃</div>
          <Logout />
        </BottomIcon>
      </BottomIconWrap> */}
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({innerWidth}) => innerWidth}px;
  box-sizing: border-box;
  position: fixed;
  min-height: 60px;
  background-color: #000046;
  overflow: hidden;
  z-index: 999;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuBox = styled.div`
  display: flex;
  color: white;
  width: 150px;
  padding-right: 5px;
  height: 60px;
  align-items: center;
  justify-content: flex-end;
`;
const MenuContainer = styled.div`
  position: fixed;
  background-color: red;
  top: 55px;
  border: 1px solid #aeaeae;
  right: 5px;
`;
const MenuItem = styled.div`
  border: 1px solid #e4e4e4;
  background-color: white;
  cursor: pointer;
  padding: 10px;
  /* justify-content: center; */
  align-items: center;
  gap: 5px;
  display: flex;
`;
const MenuText = styled.div`
  color: #343337;
`;

const MenuIcon = styled.div``;

const TopBorder = styled.div`
  border-bottom: 1px solid #babac6;
  opacity: 0.5;
`;

const ImageWrap = styled.div`
  padding-top: 18px;
  padding-left: 24px;
`;

const BottomIcon = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  div {
    color: #bdbac1;
    margin-right: 8px;
  }
`;
