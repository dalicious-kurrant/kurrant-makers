import {useLocation} from 'react-router-dom';
import {Button, Header, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import logo from '../../../assets/img/logo.png';
import {useState} from 'react';
import MakersDetailTable from './MakersDetailTable';
import withCommas from '../../../utils/withCommas';
import {
  useCompleteAdjust,
  useMakersAdjustDetail,
  useMemoAdjust,
} from '../../../hook/useAdjustment';
import DefaultTable from './DefaultTable';
import OrderData from './OrderData';
import {adjustReverseStatusFomatted} from '../../../utils/statusFormatter';

const MakersCalcDetail = () => {
  const location = useLocation();
  const id = location.state.makersId;
  const makersName = location.state.name;

  const [text, setText] = useState('');
  const {data: detailList} = useMakersAdjustDetail(id);
  const {mutateAsync: addMemo} = useMemoAdjust();
  const {mutateAsync: completeAdjust} = useCompleteAdjust();
  const list = detailList?.data?.data;

  const MemoButton = async () => {
    const data = {
      id: id,
      memo: text.trim(),
    };

    if (data.memo.trim() !== '') {
      await addMemo(data);
      setText('');
    }
  };

  const status = adjustReverseStatusFomatted(list?.makersPaycheckInfo?.status);

  const completeButton = async () => {
    // 0 : 정산 신청 완료
    const data = {
      id: [id],
      value: 0,
    };
    await completeAdjust(data);
  };

  return (
    <Wrapper>
      <MakersDetailTable data={list?.makersPaycheckInfo} />
      <ButtonWrap>
        <Button
          content="정산 완료"
          size="small"
          color="blue"
          onClick={() => {
            completeButton();
          }}
          disabled={status === 2}
        />
      </ButtonWrap>
      <Wrap>
        <Header as="h2" style={{marginBottom: 48}}>
          거래명세서
        </Header>
        <div
          style={{
            justifyContent: 'space-between',
            display: 'flex',
          }}>
          <Box>
            <Title>수신</Title>
            <TitleContent>{makersName}</TitleContent>
          </Box>

          <Box>
            <div>{list?.transactionInfoDefault?.yearMonth}</div>
          </Box>
        </div>
        <Border style={{marginBottom: 32}} />
        <Title>공급자</Title>

        <DefaultTable data={list?.transactionInfoDefault} />
        <OrderData list={list} />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">사유</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list?.paycheckAdds?.length === 0 ? (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan="3">
                  없음
                </Table.Cell>
              </Table.Row>
            ) : (
              list?.paycheckAdds?.map((el, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell textAlign="center" width={3}>
                      {el.issueDate}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.memo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {withCommas(el.price)}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
        <TotalPriceWrap>
          <TotalWrap>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Title>매출 총액</Title>
              <div>{withCommas(list?.foodsPrice)}</div>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Title>수수료({list?.commission}%)</Title>
              <div>{withCommas(list?.commissionPrice)}</div>
            </Box>
            <Border style={{margin: 0, marginBottom: 12}} />
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Title>정산 금액</Title>
              <div>{withCommas(list?.totalPrice)}</div>
            </Box>
          </TotalWrap>
        </TotalPriceWrap>
        <Border />
        <ImageWrap>
          <Statement>
            <Title>위와 같이 명세서 제출합니다.</Title>
          </Statement>
          <Image src={logo} alt="" />
        </ImageWrap>
      </Wrap>
      <Wrap style={{marginTop: 12}}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                colSpan={6}
                style={{
                  backgroundColor: '#bdbac1',
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                메이커스 메모
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell
                width={4}
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                등록날짜
              </Table.HeaderCell>
              <Table.HeaderCell
                width={4}
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                작성자
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                내용
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list?.memoResDtos?.legnth === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  메모 없음
                </Table.Cell>
              </Table.Row>
            ) : (
              list?.memoResDtos.map((el, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell textAlign="center">
                      {el.createdDateTime}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.writer}</Table.Cell>
                    <Table.Cell>{el.memo}</Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      </Wrap>
      <Wrap>
        <Title style={{marginTop: 24}}> 메모</Title>
        {/* <div>{list?.paycheckMemo}</div> */}
        <MemoWrap value={text} onChange={e => setText(e.target.value)} />
        <MemoButtonWrap>
          <Button
            content="메모작성"
            color="green"
            size="small"
            onClick={MemoButton}
          />
        </MemoButtonWrap>
      </Wrap>
    </Wrapper>
  );
};

export default MakersCalcDetail;

const Wrapper = styled.div`
  padding-left: 24px;
  margin-top: 100px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-weight: 600;
  margin-right: 24px;
`;

const Wrap = styled.div`
  //width: 70%;
`;
const Box = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const Border = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[7]};
  margin: 24px 0px;
`;

const TitleContent = styled.div`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const TotalPriceWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TotalWrap = styled.div``;

const Image = styled.img`
  width: 140px;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Statement = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
`;

const MemoWrap = styled.input`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  height: 100px;
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  outline: none;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  //width: 70%;
`;

const MemoButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
