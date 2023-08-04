import styled from 'styled-components';
import Filter from './components/Filter';
import {Pagination, Table} from 'semantic-ui-react';
import {useState} from 'react';
import {useAtom} from 'jotai';
import {noticePageAtom} from '../../utils/store/store';
import {useNavigate} from 'react-router-dom';
import {useNoticeLoad} from '../../hook/useNotice';
import {useEffect} from 'react';
import {boardTypeFormatted} from '../../utils/boardTypeFormatter';

const Notice = () => {
  const navigate = useNavigate();
  const [page, setPage] = useAtom(noticePageAtom);
  const [totalPage, setTotalPage] = useState(0);
  const [touch, setTouch] = useState(99);
  const {data: noticeList, refetch} = useNoticeLoad(page, touch);

  const goToDetailage = el => {
    navigate('/notice/detail', {
      state: el,
    });
  };

  useEffect(() => {
    if (noticeList?.data) {
      setTotalPage(noticeList?.data?.data?.total);
    }
  }, [noticeList?.data?.data]);

  useEffect(() => {
    refetch();
  }, [page, refetch, touch]);

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
            {/* <Table.HeaderCell textAlign="center" style={{color: '#787886'}}>
              내용
            </Table.HeaderCell> */}
            <Table.HeaderCell textAlign="center" style={{color: '#787886'}}>
              등록일자
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {noticeList?.data?.data?.items?.length !== 0 ? (
            noticeList?.data?.data?.items?.map((el, idx) => {
              return (
                <Table.Row
                  key={el.id}
                  onClick={() => goToDetailage(el)}
                  style={{cursor: 'pointer'}}>
                  <Table.Cell textAlign="center" width={1}>
                    {idx + 1}
                  </Table.Cell>
                  <Table.Cell textAlign="center" width={3}>
                    {boardTypeFormatted(el.boardType)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <TextoverView>{el.title}</TextoverView>
                  </Table.Cell>
                  {/* <Table.Cell width={3}>
                    <TextoverView
                      dangerouslySetInnerHTML={{
                        __html: el.content,
                      }}></TextoverView>
                  </Table.Cell> */}
                  <Table.Cell textAlign="center" width={3}>
                    {el.updated}
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center">
                공지사항이 없어요
              </Table.Cell>
            </Table.Row>
          )}
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

const TextoverView = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
  max-height: 20px;
  line-height: 20px;
`;
