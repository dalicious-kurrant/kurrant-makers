import styled from 'styled-components';

const Filter = ({touch, setTouch}) => {
  const title = [
    {id: 99, type: '전체'},
    {id: 0, type: '공지'},
    {id: 1, type: '변경 승인'},
    {id: 2, type: '정산'},
    {id: 3, type: '이벤트'},
  ];

  const onPressButton = id => {
    setTouch(id);
  };
  return (
    <Wrap>
      {title.map(el => {
        return (
          <Box
            key={el.id}
            onClick={() => onPressButton(el.id)}
            touch={touch === el.id}>
            {el.type}
          </Box>
        );
      })}
    </Wrap>
  );
};

export default Filter;

const Box = styled.div`
  display: flex;
  border: 1px solid;
  border-color: ${({touch}) => (touch ? '#4C4C67' : '#c8c8d2')};
  border-radius: 100px;

  font-weight: 300;
  font-family: 'Pretendard-Regular';
  line-height: 21px;
  padding: 8px 18px;
  margin-right: 8px;
  background-color: white;
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  margin-top: 40px;
`;
