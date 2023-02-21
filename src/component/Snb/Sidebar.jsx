import React, {useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import styled from 'styled-components';

import {ReactComponent as Building} from '../../assets/snb/building.svg';

import {menuData} from './data';
import SidebarItem from './SideBarItem';

function Sidebar() {
  const pathName = useLocation().pathname;
  const makersName = localStorage.getItem('makersName');
  const token = localStorage.getItem('token');
  const logoutButton = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('makersName');
    window.location.replace('/');
  };

  return (
    <>
      <Wrapper>
        <UserInfo>
          <ProfileWrap>
            <Profile>
              <Building />
              <MakersName>{makersName}</MakersName>
            </Profile>
            <LogoutWrap onClick={logoutButton}>
              <p>로그아웃</p>
            </LogoutWrap>
          </ProfileWrap>
        </UserInfo>
        <ul>
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
        </ul>
      </Wrapper>
    </>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  border-right: 1px solid ${({theme}) => theme.colors.grey[2]};
  min-width: 256px;
  box-sizing: border-box;
  position: fixed;
  overflow-y: auto;
`;

const MakersAdmin = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[2]};
  padding: 19px 83px;

  font-size: 12px;
  background-color: gold;
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
  color: black;
  &.active {
    color: #5a1eff;
    font-weight: 600;
  }
`;

const MakersName = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 16px;
`;

const UserInfo = styled.div`
  margin-top: 100px;
`;

const ProfileWrap = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[2]};
`;

const LogoutWrap = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
`;
