import {Button, Table, TableCell} from 'semantic-ui-react';
import styled from 'styled-components';

const DocumentInfo = () => {
  return (
    <Wrap>
      <h3>서류 정보</h3>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Cell width={2} textAlign="center">
              사업자등록증
            </Cell>
            <Table.Cell>
              <div style={{padding: 4, minHeight: 200}}>
                <input type="file" />
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Cell textAlign="center">영업신고증</Cell>
            <Table.Cell>
              <div style={{padding: 4, minHeight: 200}}>
                <input type="file" />
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Cell textAlign="center">통장사본</Cell>
            <Table.Cell>
              <div style={{padding: 4, minHeight: 200}}>
                <input type="file" />
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <ButtonWrap>
        <Button content="저장" color="green" />
      </ButtonWrap>
    </Wrap>
  );
};

export default DocumentInfo;

const Wrap = styled.div`
  margin-top: 24px;
`;

const Cell = styled(Table.Cell)`
  background-color: #f5f5f5;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;
