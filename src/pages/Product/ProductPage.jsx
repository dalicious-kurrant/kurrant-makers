/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Table, {TbodyCell} from '../../component/Table/table';
import {useGetMakerProductsList} from '../../hook/useProductsList';
import withCommas from '../../utils/withCommas';

const ProductPage = () => {
  const {data: makersProcuctList} = useGetMakerProductsList();
  const navigate = useNavigate();
  const [checkItems, setCheckItems] = useState([]);

  const goToDetail = id => {
    navigate('/productDetail/' + id, {
      state: {
        id: id,
      },
    });
  };

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('checkedList:', checkItems);
    },
    [checkItems],
  );

  const renderTableCells = useCallback(
    (menu, idx) => {
      // console.log(menu.foodTags);
      const checkHandler = (checked, id) => {
        if (checked) {
          setCheckItems(prev => [...prev, id]);
        } else {
          setCheckItems(checkItems.filter(el => el !== id));
        }
      };
      return (
        <>
          {/* <TbodyCell>
            <FlexBox>
              <input
                type="checkbox"
                id={menu.id}
                onChange={e => checkHandler(e.target.checked, menu.id)}
              />
            </FlexBox>
          </TbodyCell> */}
          <TbodyCell>
            <FlexBox>{menu.foodId}</FlexBox>
          </TbodyCell>
          <TbodyCell>
            <ImageBox>
              <Image src={menu.foodImage} alt="" />
            </ImageBox>
          </TbodyCell>
          <TbodyCell>
            <HoverBox>{menu.foodName}</HoverBox>
          </TbodyCell>
          <TbodyCell>{withCommas(menu.defaultPrice)}원</TbodyCell>
          <TbodyCell>
            {withCommas(menu.makersDiscount === 0 ? '0' : menu.makersDiscount)}%
          </TbodyCell>
          <TbodyCell>{menu.eventDiscount}%</TbodyCell>
          <TbodyCell>{withCommas(menu.resultPrice)}원</TbodyCell>
          <TbodyCell>{menu.description}</TbodyCell>
          <TbodyCell>{menu.foodTags + (idx !== 0 ? `\u00A0` : '')}</TbodyCell>
        </>
      );
    },
    [checkItems],
  );

  return (
    <Wrap>
      <h1>상품 리스트</h1>
      {/* <button onClick={onSubmit}>엑셀</button> */}
      <TableWrap>
        <Table
          headerList={[
            // {
            //   width: '56px',
            //   label: <input type="checkbox" />,
            // },
            {
              width: '80px',
              label: 'ID',
            },
            {
              width: '181px',
              label: '이미지',
            },
            {
              width: '181px',
              label: '식품 이름',
            },
            {
              width: '181px',
              label: '매장가격',
            },
            {
              width: '181px',
              label: '매장할인률',
            },
            {
              width: '181px',
              label: '이벤트할인률',
            },
            {
              width: '181px',
              label: '최종가격',
            },
            {
              width: '319px',
              label: '설명',
            },
            {
              width: '181px',
              label: '식사 태그',
            },
          ]}>
          {makersProcuctList?.data?.data?.map((menu, idx) => {
            return (
              <TableLine
                key={idx}
                id={menu.ProductId}
                onClick={() => goToDetail(menu.foodId)}>
                {renderTableCells(menu, idx)}
              </TableLine>
            );
          })}

          {/* <tr>
            <TbodyCell colSpan={10}>
              <FlexBox>
                <div>아직 등록된 메뉴가 없습니다.</div>
              </FlexBox>
            </TbodyCell>
          </tr> */}
        </Table>
      </TableWrap>
    </Wrap>
  );
};

export default ProductPage;
const Wrap = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
`;
const TableWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const FlexBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
`;

const HoverBox = styled.div`
  justify-content: center;
  align-items: center;
`;
const TableLine = styled.tr`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
const Image = styled.img`
  object-fit: cover;
  width: 120px;
  height: 80px;
  align-self: center;
  text-align: center;
`;
const ImageBox = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
