import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Form, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import Input from '../../../component/Input/input';
import {useEditOriginInfo} from '../../../hook/useMakersInfo';

const OriginModify = ({open, setOpen, nowData}) => {
  console.log(nowData);
  const {mutateAsync: editOriginInfo} = useEditOriginInfo();
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

  useEffect(() => {
    if (nowData.length !== 0) {
      setValue('name', nowData[0].name);
      setValue('origin', nowData[0].from);
    }
  }, [nowData, setValue]);

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      modifyButton();
    }
  };

  const modifyButton = async () => {
    if (
      name !== '' &&
      name !== undefined &&
      origin !== '' &&
      origin !== undefined
    ) {
      await editOriginInfo({id: nowData[0].id, name: name, from: origin});
      setOpen(false);
    }
  };
  return (
    // <Form>
    <Modal
      style={{width: 500}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}>
      <Modal.Header>원산지 정보 수정</Modal.Header>
      <Modal.Content>
        <FormProvider {...form}>
          <InputWrap>
            <Input
              name="name"
              label="품목"
              width="200px"
              // onKeyPress={handleOnKeyPress}
            />
            <Input
              name="origin"
              label="원산지"
              width="200px"
              // onKeyPress={handleOnKeyPress}
            />
          </InputWrap>
        </FormProvider>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          취소
        </Button>
        <Button
          type="submit"
          content="수정"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={modifyButton}
        />
      </Modal.Actions>
    </Modal>
    // </Form>
  );
};

export default OriginModify;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
`;
