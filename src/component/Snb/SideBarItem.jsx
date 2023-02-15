import React from 'react';
import styled from 'styled-components';

function SidebarItem({menu, isActive}) {
  return (
    <List isActive={isActive}>
      <div>{menu.icon}</div>
      <p>{menu.name}</p>
    </List>
  );
}

export default SidebarItem;

const List = styled.li`
  align-items: center;
  display: flex;
  list-style: none;
  padding: 15px 0px;
  padding-left: 26px;
  background-color: ${({isActive}) => isActive && '#f3f3f3'};
  p {
    padding-left: 10px;
  }
`;
