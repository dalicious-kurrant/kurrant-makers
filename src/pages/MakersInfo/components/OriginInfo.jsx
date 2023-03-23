import {useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import Input from '../../../component/Input/input';
import OriginModify from './OriginModify';

const OriginInfo = () => {
  const nameRef = useRef(null);

  const [originArr, setOriginArr] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [clickData, setClickData] = useState();
  const [showOpenModal, setShowOpenModal] = useState(false);

  const form = useForm({
    mode: 'all',
  });
  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;

  const name = watch('name');
  const origin = watch('origin');

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      AddRowButton();
    }
    nameRef.current.focus();
  };

  const AddRowButton = () => {
    if (
      name !== '' &&
      name !== undefined &&
      origin !== '' &&
      origin !== undefined
    ) {
      setOriginArr([...originArr, {name: name, origin: origin}]);
      setValue('name', '');
      setValue('origin', '');
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const showEditOpen = () => {
    setShowOpenModal(true);
  };
  return (
    <Wrap>
      <h3>원산지 정보</h3>

      <FormProvider {...form}>
        <InputWrap>
          <Input ref={nameRef} name="name" label="품목" width="200px" />
          <Input
            name="origin"
            label="원산지"
            width="200px"
            onKeyPress={handleOnKeyPress}
          />
          <ButtonWrap>
            <Button
              basic
              color="black"
              content="추가"
              size="small"
              onClick={() => AddRowButton()}
            />
            <Button
              content="수정"
              size="small"
              color="green"
              basic
              onClick={() => {
                showEditOpen();
              }}
            />
            <Button content="삭제" size="small" color="red" basic />
          </ButtonWrap>
        </InputWrap>
      </FormProvider>
      <Table celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell width={1}>
              <input type="checkbox" />
            </Table.HeaderCell>
            <Table.HeaderCell>품목</Table.HeaderCell>
            <Table.HeaderCell>원산지</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row textAlign="center">
            <Table.Cell>
              <input type="checkbox" />
            </Table.Cell>
            <Table.Cell>김치</Table.Cell>
            <Table.Cell>국내산</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {showOpenModal && (
        <OriginModify open={showOpenModal} setOpen={setShowOpenModal} />
      )}
    </Wrap>
  );
};
export default OriginInfo;

const Wrap = styled.div`
  margin-top: 24px;
`;

const InputWrap = styled.div`
  margin-top: 12px;
  display: flex;
`;

const ButtonWrap = styled.div`
  align-self: flex-end;
`;
