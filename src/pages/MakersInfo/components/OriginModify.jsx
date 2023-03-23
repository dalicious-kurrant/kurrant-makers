import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Form, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import Input from '../../../component/Input/input';

const OriginModify = ({open, setOpen}) => {
  const [originArr, setOriginArr] = useState([]);
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

  const modifyButton = () => {
    if (
      name !== '' &&
      name !== undefined &&
      origin !== '' &&
      origin !== undefined
    ) {
      setOriginArr([...originArr, {name: name, origin: origin}]);
      setOpen(false);
    }
  };
  return (
    <Form>
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
              <Input name="name" label="품목" width="200px" />
              <Input name="origin" label="원산지" width="200px" />
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
    </Form>
  );
};

export default OriginModify;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
`;
