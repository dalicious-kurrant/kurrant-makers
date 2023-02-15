import styled, {css, keyframes} from 'styled-components';

const AlertModal = ({
  open,
  message,
  setAlertModalOpen,
  actionMessage,
  action,
}) => {
  return (
    <Wrap open={open}>
      {open && (
        <Section>
          <div>
            <p>{message}</p>
            <ActionBtn>
              {!actionMessage ? (
                <Button onClick={setAlertModalOpen}>확인</Button>
              ) : (
                <>
                  <Button onClick={setAlertModalOpen}>취소</Button>
                  <Button onClick={action}>{actionMessage}</Button>
                </>
              )}
            </ActionBtn>
          </div>
        </Section>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  ${props =>
    props.open &&
    css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      ''animation: ${ModalBgShow} 0.3s;
    `}

  p {
    font-size: 16px;
    text-align: center;
  }
`;

const ModalShow = keyframes`
   from {
      opacity: 0;
      margin-bottom: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  `;

const ModalBgShow = keyframes`
   from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

const Section = styled.section`
  height: 180px;
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #c8c8d2;
  background-color: white;
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;

const ActionBtn = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 10px;

  justify-content: center;
`;

const Button = styled.div`
  border: 1px solid #c8c8d2;
  background-color: white;
  border-radius: 4px;
  padding: 8px 18px;
  cursor: pointer;
  &:hover {
    background-color: #c8c8d2;
  }
`;
export default AlertModal;
