import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Border} from '../Notice';

const NoticeDetail = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Wrap>
      <h1>공지사항</h1>
      <Border />
      <TitleWrap>
        <TypeBox>공지</TypeBox>
        <Title>공지 제목</Title>
      </TitleWrap>
      <UpdateText>2023.08.01</UpdateText>
      <ContentsView>dd</ContentsView>
      <ButtonWrap>
        <Button onClick={goBack}>목록</Button>
      </ButtonWrap>
    </Wrap>
  );
};

export default NoticeDetail;
const Wrap = styled.div`
  margin-top: 100px;
  margin-left: 24px;
`;

const TypeBox = styled.div`
  border: 0.5px solid #151523;
  border-radius: 4px;
  font-weight: 500;
  font-family: 'Pretendard-Regular';
  padding: 2px 8px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 400;
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  line-height: 30px;
  margin-left: 12px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

const UpdateText = styled.div`
  font-weight: 300;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  color: #787886;
  margin-top: 10px;
`;

const ContentsView = styled.div`
  border: 0.5px solid #c8c8d2;
  border-radius: 4px;
  min-height: 320px;
  margin-top: 15px;
  padding: 24px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.div`
  font-weight: 600;
  font-family: 'Pretendard-Regular';
  font-size: 17px;
  color: #33334a;
  border: 1px solid #c8c8d2;
  border-radius: 8px;
  padding: 16px 14px;
  line-height: 24px;
  width: 300px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  background-color: white;
  cursor: pointer;
`;
