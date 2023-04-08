import styled from 'styled-components';

const DataLimitSelect = ({currentValue, setLimit, options, setPage}) => {
  const handleChange = e => {
    const value = e.target.value;
    // console.log(value);
    setLimit(value);

    setPage(1);
  };

  return (
    <Form>
      {/* <Label>데이터 수</Label> */}

      <Select onChange={handleChange} value={currentValue}>
        {options.map((val, index) => {
          return (
            <Option key={index} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
      <Label>개 씩 보이게 하기 </Label>
    </Form>
  );
};

export default DataLimitSelect;

const Form = styled.form``;
const Select = styled.select`
  font-size: 20px;
  margin-right: 0.6rem;
`;
const Option = styled.option`
  font-size: 20px;
`;
const Label = styled.label`
  font-size: 20px;
`;
const PlaceholderOption = styled(Option)`
  color: ${props => props.theme.colors.Gray05};
`;
