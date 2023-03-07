import React from 'react';
import styled from 'styled-components';

function SidebarItem({menu, isActive}) {
  return (
    <List isActive={isActive}>
      <Menu>
        <div>{isActive ? menu.activeIcon : menu.icon}</div>
        <p>{menu.name}</p>
      </Menu>
    </List>
  );
}

export default SidebarItem;

const List = styled.li`
  align-items: center;
  text-align: center;
  display: flex;
  list-style: none;
  padding: 15px 0px;
  padding-left: 26px;
  background-color: ${({isActive}) => isActive && '#ffffff'};
  p {
    padding-left: 10px;
    padding-bottom: 4px;
  }

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
