/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Table} from 'semantic-ui-react';
import styled, { css } from 'styled-components';
import {useGetMakerProductsList} from '../../hook/useProductsList';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import withCommas from '../../utils/withCommas';

const ProductPage = () => {
  const [status,setStatus] = useState('');
  const {data: makersProcuctList, isLoading, refetch:refetchMakersProcuctList} = useGetMakerProductsList(status);
  const navigate = useNavigate();
  const [checkItems, setCheckItems] = useState([]);

  const goToDetail = id => {
    navigate('/productDetail/' + id, {
      state: {
        id: id,
      },
    });
  };
  const changeStatus = (status)=>{
    setStatus(status)
  }
  useEffect(()=>{
    refetchMakersProcuctList();
  },[status])
  if (isLoading) {
    return (
      <PageWrapper>
        <div>로딩중</div>
      </PageWrapper>
    );
  }

  return (
    <Wrap>
        <h1 style={{paddingRight:30}}>상품 리스트</h1>
      <FilterContainer>
        <Button color='grey' onClick={()=>changeStatus('')}>전체</Button>
        <Button color='green' onClick={()=>changeStatus(1)}>판매중</Button>
        <Button color='red' onClick={()=>changeStatus(2)}>판매중지</Button>
      </FilterContainer>
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
                <div style={{width: 100}}>공급 가격</div>
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
              if(el.foodStatus === "판매중"){
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
                    {withCommas(el.supplyPrice)}원
                  </Table.Cell>
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
                  {/* {el.foodStatus !== "판매중" &&  <DimmedCover>
                      {el.foodStatus}
                    </DimmedCover>} */}
                </TableRow>
              );
            }
            return(
              <DimmedRow
                onClick={() => goToDetail(el.foodId)}
                key={el.foodId + idx}>
                <Table.Cell textAlign="center">{el.foodId}</Table.Cell>
                <Table.Cell>
                  
                  <DimmedContainer>
                  <Image src={el.foodImage} alt="" />
                    <DimmedOverlay>
                    {el.foodStatus}
                  </DimmedOverlay>  
                  </DimmedContainer>
                </Table.Cell>
                <Table.Cell>{el.foodName}</Table.Cell>
                <Table.Cell textAlign="center">
                  {withCommas(el.supplyPrice)}원
                </Table.Cell>
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
                {/* {el.foodStatus !== "판매중" &&  <DimmedCover>
                    {el.foodStatus}
                  </DimmedCover>} */}
              </DimmedRow>
            )
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
  padding-left: 24px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 120px;
  height: 80px;
  align-self: center;
  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`
const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
  position: relative;
`;

const DimmedRow = styled(Table.Row)`
  position: relative;
  &::after {
    content: '';    
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`;

const DimmedContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DimmedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;