import styled from 'styled-components';
import Filter from './components/Filter';
import {Pagination, Table} from 'semantic-ui-react';
import {useState} from 'react';
import {useAtom} from 'jotai';
import {noticePageAtom} from '../../utils/store/store';
import {useNavigate} from 'react-router-dom';

const Notice = () => {
  const navigate = useNavigate();
  const [page, setPage] = useAtom(noticePageAtom);
  const [totalPage, setTotalPage] = useState(0);
  const [touch, setTouch] = useState([1]);

  const goToModifyPage = el => {
    navigate('/notice/detail', {
      state: el,
    });
  };

  return (
    <Wrap>
      <h1>공지사항</h1>
      <Border />
      <Filter touch={touch} setTouch={setTouch} />
      <Table celled style={{marginTop: 24}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" style={{color: '#787886'}}>
              번호
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" style={{color: '#787886'}}>
              카테고리
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" style={{color: '#787886'}}>
              제목
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" style={{color: '#787886'}}>
              등록일자
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row
            onClick={() => goToModifyPage()}
            style={{cursor: 'pointer'}}>
            <Table.Cell textAlign="center" width={1}>
              1
            </Table.Cell>
            <Table.Cell textAlign="center" width={3}>
              1
            </Table.Cell>
            <Table.Cell textAlign="center">1</Table.Cell>
            <Table.Cell textAlign="center" width={3}>
              1
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <PaginationWrap>
        <Pagination
          ellipsisItem={null}
          defaultActivePage={page}
          totalPages={totalPage}
          boundaryRange={1}
          onPageChange={(e, data) => {
            setPage(data.activePage);
          }}
        />
      </PaginationWrap>
    </Wrap>
  );
};

export default Notice;
const Wrap = styled.div`
  margin-top: 100px;
  margin-left: 24px;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const Border = styled.div`
  height: 1px;
  background-color: #33334a80;
`;
