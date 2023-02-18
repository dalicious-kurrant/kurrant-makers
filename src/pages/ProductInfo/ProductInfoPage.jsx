import {useCallback, useRef, useState} from 'react';
import {useQueryClient} from 'react-query';
import styled from 'styled-components';
import AlertModal from '../../component/AlertModal/AlertModal';
import Table, {TbodyCell} from '../../component/Table/table';
import {useExcelPost} from '../../hook/useExcelFile';
import {
  useDeleteProductList,
  useGetAllProductsList,
} from '../../hook/useProductsList';
import withCommas from '../../utils/withCommas';

const ProductInfoPage = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef();
  const {data: productList} = useGetAllProductsList();
  const {mutateAsync: deleteData} = useDeleteProductList();
  const {mutateAsync: uploadExcel} = useExcelPost();
  const [checkItems, setCheckItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteButton = async () => {
    await deleteData({foodId: checkItems});
    queryClient.invalidateQueries('allList');
  };

  const onUploadFile = async e => {
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    await uploadExcel(formData);
    queryClient.invalidateQueries('allList');
  };

  const onUploadFileButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  const renderTableCells = useCallback(
    (menu, idx) => {
      // const handleAllCheck = checked => {
      //   if (checked) {

      //     const idArray = [];
      //     menu.forEach(el => idArray.push(el.id));
      //     setCheckItems(idArray);
      //   } else {

      //     setCheckItems([]);
      //   }
      // };

      const checkHandler = (checked, id) => {
        if (checked) {
          setCheckItems(prev => [...prev, id]);
        } else {
          setCheckItems(checkItems.filter(el => el !== id));
        }
      };
      return (
        <>
          <TbodyCell>
            <FlexBox>
              <input
                type="checkbox"
                id={menu.foodId}
                onChange={e => checkHandler(e.target.checked, menu.foodId)}
              />
            </FlexBox>
          </TbodyCell>
          <TbodyCell>
            <FlexBox>{menu.foodId}</FlexBox>
          </TbodyCell>
          <TbodyCell>{menu.makersName}</TbodyCell>
          <TbodyCell>{menu.foodName}</TbodyCell>
          <TbodyCell>{menu.foodStatus}</TbodyCell>
          <TbodyCell>{withCommas(menu.defaultPrice)}원</TbodyCell>
          <TbodyCell>
            {withCommas(menu.makersDiscount === 0 ? '0' : menu.makersDiscount)}%
          </TbodyCell>
          <TbodyCell>{menu.eventDiscount}%</TbodyCell>
          <TbodyCell>{withCommas(menu.resultPrice)}원</TbodyCell>
          <TbodyCell>{menu.description}</TbodyCell>
          <TbodyCell>{menu.foodTags + (idx !== 0 ? ',  ' : '')}</TbodyCell>
        </>
      );
    },
    [checkItems],
  );

  return (
    <Wrapper>
      <h1>상품 정보</h1>
      <ButtonWrap>
        <Button onClick={openModal}>삭제</Button>
        <input type="file" ref={inputRef} onChange={onUploadFile} />
        <Button onClick={onUploadFileButtonClick}>엑셀 불러오기</Button>
      </ButtonWrap>
      <TableWrap>
        <Table
          headerList={[
            {
              width: '50px',
              label: <input type="checkbox" />,
            },
            {
              width: '40px',
              label: 'ID',
            },
            {
              width: '181px',
              label: '메이커스 이름',
            },
            {
              width: '181px',
              label: '식품 이름',
            },
            {
              width: '181px',
              label: '상태',
            },
            {
              width: '181px',
              label: '매장가격',
            },
            {
              width: '224px',
              label: '매장할인률',
            },
            {
              width: '270px',
              label: '이벤트할인률',
            },
            {
              width: '181px',
              label: '최종가격',
            },
            {
              width: '392px',
              label: '설명',
            },
            {
              width: '181px',
              label: '식사 태그',
            },
          ]}>
          {productList?.data?.data.map((menu, idx) => {
            return (
              <tr key={idx} id={menu.ProductId}>
                {renderTableCells(menu, idx)}
              </tr>
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
      <AlertModal
        open={modalOpen}
        message={'선택한 상품을 삭제 하시겠습니까?'}
        setAlertModalOpen={closeModal}
        action={deleteButton}
        actionMessage={'삭제'}
      />
    </Wrapper>
  );
};

export default ProductInfoPage;

const Wrapper = styled.div`
  padding-top: 100px;
  margin-bottom: 100px;
`;
const TableWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ButtonWrap = styled.div`
  display: flex;

  input {
    display: none;
  }
`;

const Button = styled.div`
  border: 0.5px solid #c8c8d2;
  background-color: white;
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: 500;
  cursor: pointer;
`;
