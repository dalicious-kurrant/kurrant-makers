import {useLocation, useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';
import Input from '../../component/Input/input';
import styled from 'styled-components';
import {
  useEditProductDetail,
  useGetProductDetail,
} from '../../hook/useProductsList';
import {useEffect, useState} from 'react';
import withCommas from '../../utils/withCommas';
import HashTag from '../../component/HashTag/HashTag';
import {useQueryClient} from 'react-query';

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;
  const queryClient = useQueryClient();
  const {data: detailList} = useGetProductDetail(id);
  const {mutateAsync: editData} = useEditProductDetail();
  const listData = detailList?.data?.data;
  console.log(listData);
  const [clicked, setClicked] = useState([]);

  const form = useForm({
    mode: 'all',
  });
  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
  } = form;

  const foodName = watch('foodName');
  const foodPrice = watch('foodPrice');
  const discountRate = watch('discountRate');
  const discountPrice = watch('discountPrice');
  const periodDiscountRate = watch('periodDiscountRate');
  const periodDiscountPrice = watch('periodDiscountPrice');
  const customPrice = watch('customPrice');
  const morningCapacity = watch('morning');
  const lunchCapacity = watch('lunch');
  const dinnerCapacity = watch('dinner');

  useEffect(() => {
    setValue('foodName', listData?.foodName);
    setValue('foodPrice', withCommas(listData?.foodPrice));
    setValue(
      'discountRate',
      listData?.makersDiscountRate === 0 ? '0' : listData?.makersDiscountRate,
    );
    setValue(
      'discountPrice',
      withCommas(
        listData?.makersDiscountPrice === 0
          ? '0'
          : listData?.makersDiscountPrice,
      ),
    );
    setValue(
      'periodDiscountRate',
      listData?.periodDiscountRate === 0 ? '0' : listData?.periodDiscountRate,
    );
    setValue(
      'periodDiscountPrice',
      withCommas(
        listData?.periodDiscountPrice === 0
          ? '0'
          : listData?.periodDiscountPrice,
      ),
    );
    setValue(
      'customPrice',
      withCommas(listData?.customPrice === 0 ? '0' : listData?.customPrice),
    );
    setClicked(listData?.foodTags);
    setValue('morning', withCommas(listData?.morningCapacity));
    setValue('lunch', withCommas(listData?.lunchCapacity));
    setValue('dinner', withCommas(listData?.dinnerCapacity));
  }, [
    listData?.customPrice,
    listData?.foodName,
    listData?.foodPrice,
    listData?.makersDiscountPrice,
    listData?.makersDiscountRate,
    listData?.periodDiscountPrice,
    listData?.periodDiscountRate,
    listData?.foodTags,
    setValue,
    listData?.morningCapacity,
    listData?.lunchCapacity,
    listData?.dinnerCapacity,
  ]);
  return (
    <Wrap>
      <Container>
        <div>
          <TagTitle>정기식 수정</TagTitle>
        </div>
        <InputWrap>
          <FormProvider {...form}>
            <div>
              <PriceWrap>
                <Input name="foodName" label="메뉴명" width="200px" readOnly />
                <Input name="foodPrice" label="매장가" readOnly />
                <Input name="discountRate" label="할인율" readOnly />
                <Input name="discountPrice" label="할인가" readOnly />
                <Input name="periodDiscountRate" label="기간할인율" readOnly />
                <Input name="periodDiscountPrice" label="기간할인가" readOnly />
                <Input name="customPrice" label="커스텀가" readOnly />
              </PriceWrap>
              <CapaWrap>
                <Input name="morning" label="아침식사 케파" readOnly />
                <Input name="lunch" label="점심식사 케파" readOnly />
                <Input name="dinner" label="저녁식사 케파" readOnly />
              </CapaWrap>
            </div>
          </FormProvider>
        </InputWrap>
        <div>
          <TagTitle>해시태그 등록</TagTitle>
          <HashTagWrap>
            <HashTag clicked={clicked} setClicked={setClicked} />
          </HashTagWrap>
        </div>
        <div>
          <TagTitle>상품 이미지</TagTitle>
          <ImageWrap>
            {listData &&
              listData?.foodImages.map((el, i) => {
                return (
                  <div key={el + i}>
                    <img src={el} alt="기존이미지" />
                  </div>
                );
              })}
          </ImageWrap>
        </div>
        <div>
          <TagTitle>메뉴 설명</TagTitle>
        </div>
        <Description
          readOnly
          defaultValue={listData?.description}
          key={listData?.description}
        />
        <ModifyButtonWrap>
          <ModifyButton onClick={() => navigate(-1)}>확인</ModifyButton>
        </ModifyButtonWrap>
      </Container>
    </Wrap>
  );
};

export default ProductDetailPage;

const Wrap = styled.div`
  flex-wrap: wrap;
  padding-top: 100px;
  margin-bottom: 100px;
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
`;
const InputWrap = styled.div`
  display: flex;
`;

const TagTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: #f2994a;
  margin: 50px 0px;
`;

const HashTagWrap = styled.div`
  width: 100%;

  padding-right: 40px;
`;
const ModifyButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const ModifyButton = styled.div`
  border: 0.5px solid #c8c8d2;
  background: linear-gradient(270deg, #0a0aa4 0%, #3d00e6 57.86%, #5a1eff 100%);
  border-radius: 8px;
  padding: 12px 48px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const PriceWrap = styled.div`
  display: flex;
`;

const CapaWrap = styled.div`
  display: flex;
  margin-top: 24px;
`;
const ImageWrap = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const Description = styled.textarea`
  width: 500px;
  height: 80px;
  outline: none;
  resize: none;
  padding: 4px 8px;
  border-color: #d5d4d9;
  border-radius: 4px;
`;
