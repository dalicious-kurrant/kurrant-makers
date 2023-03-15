import styled from 'styled-components';

export const PageWrapper = styled.section`
  width: 100%;
  padding: 40px;
  min-width: 1000px;
`;

export const BtnWrapper = styled.div`
  margin-bottom: 40px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  @media (max-width: 768px) {
    min-width: 200px;
  }
`;
