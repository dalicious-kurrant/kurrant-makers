import styled, {css} from 'styled-components';

const Component = ({
  hasBorderBottom = true,
  maxWidth,
  headerList,
  bodyList,
  hasHeaderPadding = true,
  isOverflowScroll,
  headerBackgroundColor,
  headerHeight,
  children,
}) => {
  return (
    <TableWrapper>
      <Table
        hasBorderBottom={hasBorderBottom}
        maxWidth={maxWidth}
        isOverflowScroll={isOverflowScroll}>
        {headerList && (
          <Thead
            headerHeight={headerHeight}
            headerBackgroundColor={headerBackgroundColor}>
            <tr>
              {headerList.map((item, index) => (
                <TheadCell
                  key={index}
                  width={item.width}
                  hasHeaderPadding={hasHeaderPadding}>
                  {item.label}
                </TheadCell>
              ))}
            </tr>
          </Thead>
        )}
        <tbody>{children}</tbody>
      </Table>
    </TableWrapper>
  );
};

export default Component;

const TableWrapper = styled.div``;

const Table = styled.table`
  max-width: 1337px;
  width: 100%;
  border-left: 0.5px solid rgb(200, 200, 210, 0.5);
  border-bottom: 0.5px solid rgb(200, 200, 210, 0.5);
  table-layout: fixed;
  max-width: ${({maxWidth}) => maxWidth};
  position: relative;
  display: block;

  /* ${({isOverflowScroll}) =>
    isOverflowScroll &&
    css`
      overflow-y: scroll;
    `};

  ${({hasBorderBottom}) =>
    !hasBorderBottom &&
    css`
      border-bottom: none;
    `} */
`;

const Thead = styled.thead`
  height: ${({headerHeight}) => (headerHeight ? headerHeight : 'auto')};
  background-color: ${({theme, headerBackgroundColor}) =>
    headerBackgroundColor ? headerBackgroundColor : 'rgb(243,243,243,0.5)'};
  border-bottom: 0.5px solid rgb(200, 200, 210, 0.5);
`;

const TheadCell = styled.th`
  padding: ${({hasHeaderPadding}) => hasHeaderPadding && '19px 14.5px'};
  max-width: ${({width}) => width};
  border-right: 0.5px solid rgb(200, 200, 210, 0.5);
  border-top: 0.5px solid rgb(200, 200, 210, 0.5);
  font-weight: 300;
  color: #787886;

  /* @media screen and (max-width: 720px) {
    width: 100%;
    max-width: none;
    min-width: ${({width}) => width};
  } */
`;

export const TbodyCell = styled.td`
  justify-content: center;
  text-align: center;
  align-items: center;
  color: ${({theme}) => theme.colors.grey[6]};
  border-right: 0.5px solid rgb(200, 200, 210, 0.5);
  border-bottom: 0.5px solid rgb(200, 200, 210, 0.5);
  padding: ${({padding}) => (padding ? padding : '20px 0px')};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 392px;
  /* ${({isMobileHeightWide}) =>
    isMobileHeightWide &&
    css`
      @media screen and (max-width: 720px) {
        height: 120px;
      }
    `}
  ${({isMobileWidthWide}) =>
    isMobileWidthWide &&
    css`
      @media screen and (max-width: 720px) {
        overflow-x: scroll;
        width: 200px;
      }
    `} */
`;

const TBody = styled.tbody`
  overflow-y: scroll;
`;
