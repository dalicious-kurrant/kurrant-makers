import {Link, useNavigate} from 'react-router-dom';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {PageWrapper} from '../../layout/common.style';
import ExcelIcon from '../../assets/icon/excel.svg';
import PDFIcon from '../../assets/icon/pdfIcon.svg';
import {useMakersAdjustList} from '../../hook/useAdjustment';
import MakersFilter from './components/MakersFilter';
import {useAtom} from 'jotai';
import {
  endMonthAtom,
  selectClientAtom,
  selectModifyAtom,
  selectStatusAtom,
  startMonthAtom,
} from '../../utils/store/store';
import {useEffect} from 'react';
import withCommas from '../../utils/withCommas';

const Calculate = () => {
  const navigate = useNavigate();
  const [startMonth, setStartMonth] = useAtom(startMonthAtom);
  const [endMonth, setEndMonth] = useAtom(endMonthAtom);
  const [selectClient, setSelectClient] = useAtom(selectClientAtom);
  const [selectStatus, setSelectStatus] = useAtom(selectStatusAtom);
  const [selectModify, setSelectModify] = useAtom(selectModifyAtom);

  const start = startMonth?.split('-')[0] + startMonth?.split('-')[1];
  const end = endMonth?.split('-')[0] + endMonth?.split('-')[1];

  const {data: makersAdjustList, refetch} = useMakersAdjustList(
    start,
    end,
    selectClient,
    selectStatus,
    selectModify,
  );

  const goToPage = (id, name) => {
    navigate('/calculate/detail', {
      state: {
        makersId: id,
        name: name,
      },
    });
  };
  useEffect(() => {
    refetch();
  }, [refetch, startMonth, endMonth, selectClient, selectStatus, selectModify]);

  return (
    <Wrap>
      <h1>메이커스 정산 페이지</h1>
      <MakersFilter />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">예금주</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">은행명</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">계좌번호</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">엑셀</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">PDF</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {makersAdjustList?.data?.data?.makersLists?.map(v => {
            return (
              <Table.Row key={v.id} style={{cursor: 'pointer'}}>
                <Table.Cell
                  textAlign="center"
                  onClick={() => {
                    goToPage(v.id, v.makersName);
                  }}>
                  {v.year}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => {
                    goToPage(v.id, v.makersName);
                  }}>
                  {v.month}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => {
                    goToPage(v.id, v.makersName);
                  }}>
                  {v.makersName}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => {
                    goToPage(v.id, v.makersName);
                  }}>
                  {withCommas(v.totalPrice)}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => {
                    goToPage(v.id, v.makersName);
                  }}>
                  {v.accountHolder}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => {
                    goToPage(v.id, v.makersName);
                  }}>
                  {v.nameOfBank}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => {
                    goToPage(v.id, v.makersName);
                  }}>
                  {v.accountNumber}
                </Table.Cell>
                <Table.Cell textAlign="center">{v.paycheckStatus}</Table.Cell>
                <Table.Cell textAlign="center">
                  {v.excelFile ? (
                    <Link to={v.excelFile}>
                      <InputImage alt="ExcelIcon" src={ExcelIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {v.pdfFile ? (
                    <Link to={v.pdfFile}>
                      <InputImage alt="PDFIcon" src={PDFIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Wrap>
  );
};

export default Calculate;

const InputImage = styled.img`
  width: 40px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 20px;
  margin-top: 24px;
`;

const Wrap = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  padding-right: 24px;
  padding-left: 24px;
  height: 100vh;
`;
