import styled from 'styled-components';

const DiningMobileButton = ({touch, setTouch}) => {
  const type = ['아침', '점심', '저녁'];

  const onPressButton = idx => {
    console.log(touch,idx)
    if (touch?.includes(idx)) {
      return setTouch(touch?.filter(v => v !== idx));
    }
    setTouch([...touch, idx]);
  };

  return (
    <Wrap>
      {type.map((m, idx) => {
        return (
          <ButtonWrap
            key={idx}
            onClick={() => {
              onPressButton(idx);
            }}
            touch={touch?.includes(idx)}
            idx={idx}>
            <TypeText touch={touch?.includes(idx)} idx={idx}>
              {m}
            </TypeText>
          </ButtonWrap>
        );
      })}
    </Wrap>
  );
};

export default DiningMobileButton;

const Wrap = styled.div`
  display: flex;
  //justify-content: space-between;
  margin-bottom: 8px;
`;
const ButtonWrap = styled.div`
  background-color: ${({theme, touch}) => (touch ? theme.colors.grey[2] :theme.colors.grey[8])};
  padding: 6.5px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 50px;
  margin-right: 10px;
  cursor: pointer;
`;

const TypeText = styled.div`
  color: ${({theme, touch}) => (touch ? theme.colors.grey[0] : theme.colors.grey[5])};
  font-weight: 600;
`;
