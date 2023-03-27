import React, {useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import Input from '../../../component/Input/input';
import {
  useAddOriginInfo,
  useDeleteOriginInfo,
  useGetOriginInfo,
} from '../../../hook/useMakersInfo';
import OriginModify from './OriginModify';

const OriginInfo = () => {
  const nameRef = useRef(null);

  const [checkItems, setCheckItems] = useState([]);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const {data: originInfo} = useGetOriginInfo();
  const {mutateAsync: saveOriginInfo} = useAddOriginInfo();
  const {mutateAsync: deleteOriginInfo} = useDeleteOriginInfo();
  const originData = originInfo?.data?.data;

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const name = watch('name');
  const origin = watch('origin');

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      AddRowButton();
    }
    nameRef.current.focus();
  };

  const AddRowButton = async () => {
    if (
      name?.trim() !== '' &&
      name !== undefined &&
      origin?.trim() !== '' &&
      origin !== undefined
    ) {
      await saveOriginInfo([{name: name?.trim(), from: origin?.trim()}]);
      setValue('name', '');
      setValue('origin', '');
    }
  };

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      originData?.forEach(el => idArray.push(el.id));

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
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
    if (checkItems.length === 1) {
      setShowOpenModal(true);
    } else {
      alert('하나의 품목만 선택해 주세요');
    }
  };

  const cancelButton = async () => {
    if (checkItems.length !== 0) {
      await deleteOriginInfo({idList: checkItems});
      setCheckItems([]);
    }
  };
  console.log(checkItems);
  return (
    <Wrap>
      <h3>원산지 정보</h3>
      <div>품목과 원산지를 입력하고 추가 버튼을 클릭해 주세요.</div>
      <div>
        품목/원산지 수정은 한 품목씩 가능하며, 체크박스 선택 후 수정 버튼을
        클릭해 주세요.
      </div>
      <div>삭제 시 체크박스 선택 후 삭제 버튼을 클릭해 주세요.</div>
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
            <Button
              content="삭제"
              size="small"
              color="red"
              basic
              onClick={() => {
                cancelButton();
              }}
            />
          </ButtonWrap>
        </InputWrap>
      </FormProvider>
      <Table celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell width={1}>
              <input
                checked={
                  checkItems.length === (originData && originData.length)
                    ? true
                    : false
                }
                type="checkbox"
                onChange={e => handleAllCheck(e.target.checked)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>품목</Table.HeaderCell>
            <Table.HeaderCell>원산지</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {originData?.map((el, idx) => (
            <React.Fragment key={el.id + idx}>
              <Table.Row textAlign="center">
                <Table.Cell>
                  <input
                    checked={checkItems.includes(el.id) ? true : false}
                    type="checkbox"
                    onChange={e => handleSingleCheck(e.target.checked, el.id)}
                  />
                </Table.Cell>
                <Table.Cell>{el.name}</Table.Cell>
                <Table.Cell>{el.from}</Table.Cell>
              </Table.Row>
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
      {showOpenModal && (
        <OriginModify
          open={showOpenModal}
          setOpen={setShowOpenModal}
          nowData={checkItems}
          setCheckItems={setCheckItems}
          data={originData}
        />
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
