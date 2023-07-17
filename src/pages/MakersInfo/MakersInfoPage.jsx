import {useEffect, useState} from 'react';
import {Label} from 'semantic-ui-react';
import styled from 'styled-components';
import DocumentInfo from './components/DocumentInfo';
import MakersInfo from './components/MakersInfo';
import OriginInfo from './components/OriginInfo';

const MakersInfoPage = () => {
  const [index, setIndex] = useState(0);

  const data = [
    {
      id: 0,
      title: '기본 정보',
      component: <MakersInfo />,
    },
    {
      id: 1,
      title: '원산지 정보',
      component: <OriginInfo />,
    },
    {
      id: 2,
      title: '서류 정보',
      component: <DocumentInfo />,
    },
  ];
  return (
    <Wrapper>
      <h1>메이커스 정보</h1>
      <LabelWrap>
        {data.map(item => (
          <Label
            key={item.id}
            content={item.title}
            color="blue"
            size="large"
            style={{cursor: 'pointer'}}
            onClick={() => setIndex(item.id)}
          />
        ))}
        {data
          .filter(item => index === item.id)
          .map(el => (
            <div key={el.id}>{el.component}</div>
          ))}
      </LabelWrap>
    </Wrapper>
  );
};

export default MakersInfoPage;
const Wrapper = styled.div`
  margin-top: 80px;
  margin-bottom: 50px;
  margin-left: 20px;
`;

const Wrap = styled.div``;

const LabelWrap = styled.div`
  margin-top: 24px;
`;
