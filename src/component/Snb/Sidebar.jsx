import React, {useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {ReactComponent as Building} from '../../assets/snb/building.svg';
import Logo from '../../assets/logo3.png';
import {menuData} from './data';
import SidebarItem from './SideBarItem';
import {ReactComponent as CsIcon} from '../../assets/icon/cs.svg';
import {ReactComponent as Logout} from '../../assets/icon/logout.svg';

function Sidebar() {
  const pathName = useLocation().pathname;
  const pathNameChk = pathName.split('/')[1];
  const makersName = localStorage.getItem('makersName');
  const token = localStorage.getItem('token');
  const logoutButton = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  return (
    <Wrapper id="sidebar">
      <ImageWrap>
        <img src={Logo} alt="logo" width={85} height={24} />
      </ImageWrap>

      <UserInfo>
        <MakersAdminWrap>
          <p>메이커스 관리자</p>
        </MakersAdminWrap>
        <TopBorder />
        <ProfileWrap>
          <Profile>
            <Building />
            <MakersName>{makersName}</MakersName>
          </Profile>
        </ProfileWrap>
        <Border />
      </UserInfo>
      <ul
        style={{
          paddingLeft: 8,
          marginBottom: 70,

          overflowY: 'auto',
        }}>
        {menuData.map((menu, index) => {
          const menuPathChk = menu.path.split('/')[1];
          return (
            <StyleNavLink
              to={menu.path}
              key={index}
              className={({isActive}) => (isActive ? 'active' : undefined)}>
              <SidebarItem
                menu={menu}
                isActive={pathNameChk === menuPathChk ? true : false}
              />
            </StyleNavLink>
          );
        })}
      </ul>
      <BottomIconWrap>
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
      </BottomIconWrap>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  min-width: 256px;
  box-sizing: border-box;
  position: fixed;
  //overflow-y: auto;
  background-color: #000046;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0px;
  margin: 0px 16px;
`;

const StyleNavLink = styled(NavLink)`
  text-decoration: none;
  color: #e4e3e7;
  &.active {
    color: #5a1eff;
    font-weight: 600;
  }
`;

const MakersName = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 16px;
  color: white;
`;

const UserInfo = styled.div`
  margin-top: 40px;
`;

const ProfileWrap = styled.div``;

const TopBorder = styled.div`
  border-bottom: 1px solid #babac6;
  opacity: 0.5;
`;

const Border = styled(TopBorder)`
  margin: 0px 18px 24px 8px;
`;

const ImageWrap = styled.div`
  padding-top: 18px;
  padding-left: 24px;
`;

const MakersAdminWrap = styled.div`
  p {
    color: white;
    font-size: 14px;
    font-weight: 600;
  }

  display: flex;
  justify-content: center;
  margin-bottom: 18px;
`;

const BottomIconWrap = styled.div`
  display: flex;

  position: absolute;
  padding: 0px 50px;
  bottom: 0px;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 25px;
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

const CsWrap = styled(BottomIcon)``;
