/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {TbodyCell} from '../../component/Table/table';
import {useGetMakerProductsList} from '../../hook/useProductsList';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import withCommas from '../../utils/withCommas';

const ProductPage = () => {
  const {data: makersProcuctList, isLoading} = useGetMakerProductsList();
  const navigate = useNavigate();
  const [checkItems, setCheckItems] = useState([]);

  const goToDetail = id => {
    navigate('/productDetail/' + id, {
      state: {
        id: id,
      },
    });
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <div>로딩중</div>
      </PageWrapper>
    );
  }

  return (
    <Wrap>
      <h1>상품 리스트</h1>

      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">이미지</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 200}}>식품 이름</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 100}}>매장 가격</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 100}}>멤버십 할인률</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 100}}>매장 할인률</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 100}}>이벤트 할인률</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 100}}>최종가격</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 200}}>설명</div>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <div style={{width: 250}}>식사 태그</div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {makersProcuctList?.data?.data?.map((el, idx) => {
              return (
                <TableRow
                  onClick={() => goToDetail(el.foodId)}
                  key={el.foodId + idx}>
                  <Table.Cell textAlign="center">{el.foodId}</Table.Cell>
                  <Table.Cell>
                    <Image src={el.foodImage} alt="" />
                  </Table.Cell>
                  <Table.Cell>{el.foodName}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.defaultPrice)}원
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.membershipDiscount === 0 ? '0' : el.membershipDiscount}%
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.makersDiscount === 0 ? '0' : el.makersDiscount}%
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {el.eventDiscount === 0 ? '0' : el.eventDiscount}%
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.resultPrice)}원
                  </Table.Cell>
                  <Table.Cell>{el.description}</Table.Cell>
                  <Table.Cell>
                    {el.foodTags + (idx !== 0 ? `\u00A0` : '')}
                  </Table.Cell>
                </TableRow>
              );
            })}
          </Table.Body>
        </Table>
      </TableWrapper>
    </Wrap>
  );
};

export default ProductPage;
const Wrap = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  padding-right: 24px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 120px;
  height: 80px;
  align-self: center;
  text-align: center;
`;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
