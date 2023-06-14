import {useEffect, useRef, useState} from 'react';
import {Button, Header, Label, Select, Table} from 'semantic-ui-react';
import {Table as AntTable} from 'antd';

import styled, {css, useTheme} from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';
import DiningButton from './components/DiningButton';
import {PageWrapper, TableWrapper} from '../../layout/common.style';
import {useGetSalesList} from '../../hook/useSalesList';
import {maskingName} from '../../utils/maskingName';
import TestData from './test';
import {useAtom} from 'jotai';
import {pageWidthAtom} from '../../utils/store/store';
import withCommas from '../../utils/withCommas';
import { groupTypeFormatted } from '../../utils/statusFormatter';
import DeliveryCard from './components/DeliveryCard';
import DesktopMode from './components/DesktopMode';
import MobileMode from './components/MobileMode';

const deliveryGroupsByDates = {
  deliveryGroupsByDates: [
    {
      serviceDate: '2023-05-23',
      diningType: '점심',
      spotCount: 8,
      deliveryGroups: [
        {
          deliveryTime: '12:00',
          spotCount: 8,
          foods: [
            {
              foodId: 729,
              foodCount: 2,
              foodName: '[BULK UP] Big Burger SET',
            },
            {
              foodId: 730,
              foodCount: 11,
              foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
            },
            {
              foodId: 734,
              foodCount: 13,
              foodName: '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
            },
          ],
          foodCount: 26,
          foodBySpots: [
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 534 글라스타워 17층',
              address2: '글라스타워 17층',
              spotName: '글라스타워 7F',
              groupName: '메드트로닉',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 730,
                  foodCount: 1,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 4,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 5,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 테헤란로51길 21 3F 달리셔스',
              address2: '3F 달리셔스',
              spotName: '달리셔스',
              groupName: '달리셔스',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 730,
                  foodCount: 3,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 4,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 영동대로 302 3층 4층',
              address2: '3층 4층',
              spotName: '롯데상사 4F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 영동대로 302 3F 4F',
              address2: '3F 4F',
              spotName: '롯데상사 3F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 학동로 230 유빔빌딩 3F',
              address2: '유빔빌딩 3F',
              spotName: '유빔빌딩 3F',
              groupName: '세이클',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 14층',
              address2: '연봉빌딩 14층',
              spotName: '연봉빌딩 14F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 730,
                  foodCount: 6,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 3,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 10,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 217 오렌지플레닛, 7층',
              address2: '오렌지플레닛, 7층',
              spotName: '오렌지플래닛 7F',
              groupName: '루센트블록',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 730,
                  foodCount: 1,
                  foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
                },
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 3,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 13층',
              address2: '연봉빌딩 13층',
              spotName: '연봉빌딩 13F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 734,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
                },
              ],
              foodCount: 1,
            },
          ],
        },
      ],
    },
    {
      serviceDate: '2023-05-24',
      diningType: '점심',
      spotCount: 14,
      deliveryGroups: [
        {
          deliveryTime: '12:00',
          spotCount: 12,
          foods: [
            {
              foodId: 729,
              foodCount: 6,
              foodName: '[BULK UP] Big Burger SET',
            },
            {
              foodId: 731,
              foodCount: 17,
              foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
            },
            {
              foodId: 735,
              foodCount: 21,
              foodName:
                '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
            },
          ],
          foodCount: 44,
          foodBySpots: [
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 영동대로 302 3F 4F',
              address2: '3F 4F',
              spotName: '롯데상사 3F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 영동대로 302 3층 4층',
              address2: '3층 4층',
              spotName: '롯데상사 4F',
              groupName: '롯데상사',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 735,
                  foodCount: 2,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 언주로 552 5층',
              address2: '5층',
              spotName: 'MJC 빌딩 5F',
              groupName: '도미네이트',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 217 오렌지플레닛, 7층',
              address2: '오렌지플레닛, 7층',
              spotName: '오렌지플래닛 7F',
              groupName: '루센트블록',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 735,
                  foodCount: 2,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 14층',
              address2: '연봉빌딩 14층',
              spotName: '연봉빌딩 14F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 729,
                  foodCount: 2,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 731,
                  foodCount: 3,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 6,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 427 5층 데이터독',
              address2: '5층 데이터독',
              spotName: '위워크 선릉2호점 5F',
              groupName: '데이터독',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 731,
                  foodCount: 5,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 5,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 11,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 534 글라스타워 17층',
              address2: '글라스타워 17층',
              spotName: '글라스타워 7F',
              groupName: '메드트로닉',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 729,
                  foodCount: 2,
                  foodName: '[BULK UP] Big Burger SET',
                },
                {
                  foodId: 731,
                  foodCount: 4,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 6,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 12,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 518 섬유센터 13층 137호',
              address2: '섬유센터 13층 137호',
              spotName: '섬유센터 13F',
              groupName: '벤처블릭 코리아',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로 416 연봉빌딩 13층',
              address2: '연봉빌딩 13층',
              spotName: '연봉빌딩 13F',
              groupName: '쓰리빌리언',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 2,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 3,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울특별시 강남구 테헤란로51길 21 3F 달리셔스',
              address2: '3F 달리셔스',
              spotName: '달리셔스',
              groupName: '달리셔스',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 731,
                  foodCount: 2,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 테헤란로51길 21 3층 달리셔스',
              address2: '3층 달리셔스',
              spotName: '대시모빌리티',
              groupName: '대시모빌리티',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 729,
                  foodCount: 1,
                  foodName: '[BULK UP] Big Burger SET',
                },
              ],
              foodCount: 1,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '11:20',
              address1: '서울 강남구 언주로 552 5층',
              address2: '5층',
              spotName: 'MJC 빌딩 5F',
              groupName: '브랜드리팩터링',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
              ],
              foodCount: 1,
            },
          ],
        },
        {
          deliveryTime: '13:00',
          spotCount: 2,
          foods: [
            {
              foodId: 731,
              foodCount: 1,
              foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
            },
            {
              foodId: 735,
              foodCount: 2,
              foodName:
                '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
            },
          ],
          foodCount: 3,
          foodBySpots: [
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '12:20',
              address1: '서울 강남구 봉은사로68길 31 지층 뷰티셀렉션',
              address2: '지층 뷰티셀렉션',
              spotName: '은혜빌딩 지하1층',
              groupName: '뷰티셀렉션 (은혜빌딩)',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 731,
                  foodCount: 1,
                  foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
                },
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 2,
            },
            {
              deliveryId: null,
              spotType: 0,
              pickUpTime: '12:20',
              address1: '서울 강남구 봉은사로 465 아이타워 6층',
              address2: '아이타워 6층',
              spotName: '아이타워 6F',
              groupName: '뷰티셀렉션 (아이타워)',
              userName: null,
              phone: null,
              foods: [
                {
                  foodId: 735,
                  foodCount: 1,
                  foodName:
                    '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
                },
              ],
              foodCount: 1,
            },
          ],
        },
      ],
    },
  ],
  totalFoods: [
    {
      foodId: 729,
      description:
        '(ABT)Total Calories 920_ Protein 32(g) / Carb 26(g) / Fat 11(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n기름기가 적은 소고기와 돼지고기부위를 1:1 비율로 소금과 후추만 들어간 순수 미트패티 와 구운버터감자',
      totalFoodCount: 8,
      foodName: '[BULK UP] Big Burger SET',
    },
    {
      foodId: 730,
      description:
        '(ABT)Total Calories 940_ Protein 36(g) / Carb 43(g) / Fat 9(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n그릴에 구운 스테이크와 구운 고구마와 샤워크림 ',
      totalFoodCount: 11,
      foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
    },
    {
      foodId: 731,
      description:
        '(ABT)Total Calories 860_ Protein 32(g) / Carb 32 (g) / Fat 11(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n스파이시한 닭가슴살 슬라이스와 타코샐러드 & 과콰몰리 & 또르띠아',
      totalFoodCount: 18,
      foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
    },
    {
      foodId: 734,
      description:
        'Total Calories 380_ Protein 32(g) / Carb 30(g) / Fat 6(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n그릴에 구운 틸라피아 생선과 백미와 자스민쌀 1:1 비율로 포만감이 좋고, 칼로리는 낮음',
      totalFoodCount: 13,
      foodName: '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
    },
    {
      foodId: 735,
      description:
        'Total Calories 430 _ Protein 36(g) / Carb 30(g) / Fat 9(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n수비드하게 익힌 부채살과 약간의 버터를 겻들인 매쉬드포테이토 + 삶은채소와 아몬드',
      totalFoodCount: 23,
      foodName: '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
    },
  ],
  foodByDateDiningTypes: [
    {
      serviceDate: '2023-05-23',
      diningType: '점심',
      totalCount: 26,
      foods: [
        {
          foodId: 729,
          foodCount: 2,
          foodName: '[BULK UP] Big Burger SET',
        },
        {
          foodId: 730,
          foodCount: 11,
          foodName: '[BULK UP] Beef Steak AND Baked Sweet Potatoes',
        },
        {
          foodId: 734,
          foodCount: 13,
          foodName: '[WEIGHT LOSS] Tilapia 120g AND Low calories Rice120g',
        },
      ],
    },
    {
      serviceDate: '2023-05-24',
      diningType: '점심',
      totalCount: 47,
      foods: [
        {
          foodId: 729,
          foodCount: 6,
          foodName: '[BULK UP] Big Burger SET',
        },
        {
          foodId: 731,
          foodCount: 18,
          foodName: '[BULK UP] Grilled Mexican Chicken Taco Salad',
        },
        {
          foodId: 735,
          foodCount: 23,
          foodName:
            '[WEIGHT LOSS] Sous vide Beef 120g AND mashed Potatoes 120g',
        },
      ],
    },
  ],
};
const Schedule = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [innerWidth, setInnerWidth] = useAtom(pageWidthAtom);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const [diningSelect, setDiningSelect] = useState([0, 1, 2]);

  const types =
    diningSelect &&
    diningSelect.map(el => {
      if (el === 0) {
        return 1;
      }
      if (el === 1) {
        return 2;
      }
      if (el === 2) {
        return 3;
      }
      return el;
    });
  const {refetch} = useGetSalesList(
    startDate,
    endDate,
    types,
  );


  const totalFood = deliveryGroupsByDates?.totalFoods;




  return (
    <Wrapper isMobile={innerWidth > 768}>
      {innerWidth > 768 ? <DesktopMode salesList={deliveryGroupsByDates} refetch={refetch}/>:<MobileMode salesList={deliveryGroupsByDates} refetch={refetch}/>}
     
    </Wrapper>
  );
};

export default Schedule;

const Wrapper = styled.div`
  width: 100%;
  ${({isMobile})=>{
    if(!isMobile)css`
      padding: 40px;
      min-width: 1024px;
    `
  }}
  
  
`;














