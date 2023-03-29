import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {useGetMakersInfo} from '../../../hook/useMakersInfo';
import {TableWrapper} from '../../../layout/common.style';
import {bizNoFormatter} from '../../../utils/bizNumberFormatter';

const MakersInfo = () => {
  const {data: makersInfo} = useGetMakersInfo();
  const infoData = makersInfo && makersInfo?.data?.data[0];

  return (
    <Wrap>
      <h3>기본 정보</h3>
      <div>
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Cell width={4}>메이커스 코드</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.code}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>메이커스 이름</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.name}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>법인명</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.companyName}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>사업자대표</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.ceo}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>대표자 전화번호</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.ceoPhone}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>담당자 이름</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.managerName}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>담당자 전화번호</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.managerPhone}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>일일 최대 수량</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.dailyCapacity}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>가능 다이닝 타입</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>
                  {infoData?.diningTypes.join(',')}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>서비스 업종</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.serviceType}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>서비스 형태</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.serviceForm}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>모회사 여부</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>
                  {infoData?.isParentCompany ? '있음' : '없음'}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>모회사 ID</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>
                  {infoData?.parentCompanyId ?? '없음'}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>우편주소</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.zipCode}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>기본주소</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.address1}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>상세주소</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.address2}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>위치</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.location}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>사업자등록번호</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>
                  {bizNoFormatter(infoData?.companyRegistrationNumber)}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>계약 시작 날짜</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.contractStartDate}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>계약 종료 날짜</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.contractEndDate}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>외식영양정보 표시 대상 여부</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>
                  {infoData?.isNutritionInformation ? '대상' : '비대상'}
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>영업 시작 시간</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.openTime}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>영업 종료 시간</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.closeTime}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>은행</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.bank}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>예금주명</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.depositHolder}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>계좌번호</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.accountNumber}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>생성일</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.createdDateTime}</div>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Cell width={4}>수정일</Cell>
              <Table.Cell>
                <div style={{padding: 4}}>{infoData?.updatedDateTime}</div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </Wrap>
  );
};

export default MakersInfo;
const Wrap = styled.div`
  margin-top: 24px;
  margin-bottom: 50px;
`;

const Cell = styled(Table.Cell)`
  background-color: #f5f5f5;
`;

const TableCell = styled(Table.Cell)`
  padding: 10px 0px;
`;
