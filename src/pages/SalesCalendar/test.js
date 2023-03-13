const data = [
  {
    serviceDate: '2023-03-10',
    diningType: '점심',
    foodByGroups: [
      {
        groupId: 113,
        groupName: '스파크플러스 선릉3호점',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 113,
            spotName: '1F 라운지',
            foods: [
              {
                foodId: 24,
                foodCount: 1,
                foodName: '모모의 픽 5',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    serviceDate: '2023-03-15',
    diningType: '점심',
    foodByGroups: [
      {
        groupId: 98,
        groupName: '데이터독',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 98,
            spotName: '위워크 선릉2호점 5F',
            foods: [
              {
                foodId: 25,
                foodCount: 2,
                foodName: '모모의 픽 6',
              },
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
        ],
      },
      {
        groupId: 95,
        groupName: '롯데상사',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 95,
            spotName: '롯데상사 3F',
            foods: [
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
          {
            deliveryTime: '12:00',
            spotId: 134,
            spotName: '롯데상사 4F',
            foods: [
              {
                foodId: 20,
                foodCount: 1,
                foodName: '모모의 픽 1',
              },
            ],
          },
        ],
      },
      {
        groupId: 133,
        groupName: '도미네이트',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 132,
            spotName: 'MJC 빌딩 5F',
            foods: [
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
              {
                foodId: 22,
                foodCount: 1,
                foodName: '모모의 픽 3',
              },
              {
                foodId: 25,
                foodCount: 1,
                foodName: '모모의 픽 6',
              },
            ],
          },
        ],
      },
      {
        groupId: 99,
        groupName: '쓰리빌리언',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 133,
            spotName: '연봉빌딩 14F',
            foods: [
              {
                foodId: 21,
                foodCount: 3,
                foodName: '모모의 픽 2',
              },
            ],
          },
          {
            deliveryTime: '12:00',
            spotId: 99,
            spotName: '연봉빌딩 13F',
            foods: [
              {
                foodId: 21,
                foodCount: 1,
                foodName: '모모의 픽 2',
              },
              {
                foodId: 20,
                foodCount: 1,
                foodName: '모모의 픽 1',
              },
            ],
          },
        ],
      },
      {
        groupId: 102,
        groupName: '루센트블록',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 102,
            spotName: '오렌지플래닛 7F',
            foods: [
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
              {
                foodId: 22,
                foodCount: 1,
                foodName: '모모의 픽 3',
              },
            ],
          },
        ],
      },
      {
        groupId: 132,
        groupName: '벤처블릭 코리아',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 131,
            spotName: '섬유센터 13F',
            foods: [
              {
                foodId: 20,
                foodCount: 1,
                foodName: '모모의 픽 1',
              },
              {
                foodId: 25,
                foodCount: 1,
                foodName: '모모의 픽 6',
              },
            ],
          },
        ],
      },
      {
        groupId: 93,
        groupName: '달리셔스',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 93,
            spotName: '상경빌딩 3F',
            foods: [
              {
                foodId: 23,
                foodCount: 2,
                foodName: '모모의 픽 4',
              },
              {
                foodId: 22,
                foodCount: 1,
                foodName: '모모의 픽 3',
              },
            ],
          },
        ],
      },
      {
        groupId: 97,
        groupName: '메드트로닉',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 97,
            spotName: '글라스타워 7F',
            foods: [
              {
                foodId: 21,
                foodCount: 1,
                foodName: '모모의 픽 2',
              },
            ],
          },
        ],
      },
      {
        groupId: 96,
        groupName: '뷰티셀렉션 (은혜빌딩)',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 96,
            spotName: '은혜빌딩 지하1층',
            foods: [
              {
                foodId: 21,
                foodCount: 2,
                foodName: '모모의 픽 2',
              },
            ],
          },
        ],
      },
      {
        groupId: 103,
        groupName: '브랜드리팩터링',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 103,
            spotName: 'MJC 빌딩 5F',
            foods: [
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
        ],
      },
      {
        groupId: 100,
        groupName: '주식회사 디엔코리아',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 100,
            spotName: '패스트파이브 용산 23F',
            foods: [
              {
                foodId: 20,
                foodCount: 1,
                foodName: '모모의 픽 1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    serviceDate: '2023-03-16',
    diningType: '점심',
    foodByGroups: [
      {
        groupId: 102,
        groupName: '루센트블록',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 102,
            spotName: '오렌지플래닛 7F',
            foods: [
              {
                foodId: 22,
                foodCount: 2,
                foodName: '모모의 픽 3',
              },
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
        ],
      },
      {
        groupId: 97,
        groupName: '메드트로닉',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 97,
            spotName: '글라스타워 7F',
            foods: [
              {
                foodId: 21,
                foodCount: 2,
                foodName: '모모의 픽 2',
              },
            ],
          },
        ],
      },
      {
        groupId: 95,
        groupName: '롯데상사',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 95,
            spotName: '롯데상사 3F',
            foods: [
              {
                foodId: 25,
                foodCount: 1,
                foodName: '모모의 픽 6',
              },
            ],
          },
          {
            deliveryTime: '12:00',
            spotId: 134,
            spotName: '롯데상사 4F',
            foods: [
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
        ],
      },
      {
        groupId: 103,
        groupName: '브랜드리팩터링',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 103,
            spotName: 'MJC 빌딩 5F',
            foods: [
              {
                foodId: 22,
                foodCount: 1,
                foodName: '모모의 픽 3',
              },
              {
                foodId: 24,
                foodCount: 1,
                foodName: '모모의 픽 5',
              },
            ],
          },
        ],
      },
      {
        groupId: 93,
        groupName: '달리셔스',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 93,
            spotName: '상경빌딩 3F',
            foods: [
              {
                foodId: 22,
                foodCount: 1,
                foodName: '모모의 픽 3',
              },
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
        ],
      },
      {
        groupId: 99,
        groupName: '쓰리빌리언',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 133,
            spotName: '연봉빌딩 14F',
            foods: [
              {
                foodId: 21,
                foodCount: 2,
                foodName: '모모의 픽 2',
              },
            ],
          },
          {
            deliveryTime: '12:00',
            spotId: 99,
            spotName: '연봉빌딩 13F',
            foods: [
              {
                foodId: 21,
                foodCount: 1,
                foodName: '모모의 픽 2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    serviceDate: '2023-03-17',
    diningType: '점심',
    foodByGroups: [
      {
        groupId: 99,
        groupName: '쓰리빌리언',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 133,
            spotName: '연봉빌딩 14F',
            foods: [
              {
                foodId: 21,
                foodCount: 3,
                foodName: '모모의 픽 2',
              },
            ],
          },
          {
            deliveryTime: '12:00',
            spotId: 99,
            spotName: '연봉빌딩 13F',
            foods: [
              {
                foodId: 21,
                foodCount: 1,
                foodName: '모모의 픽 2',
              },
              {
                foodId: 20,
                foodCount: 1,
                foodName: '모모의 픽 1',
              },
            ],
          },
        ],
      },
      {
        groupId: 132,
        groupName: '벤처블릭 코리아',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 131,
            spotName: '섬유센터 13F',
            foods: [
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
        ],
      },
      {
        groupId: 95,
        groupName: '롯데상사',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 95,
            spotName: '롯데상사 3F',
            foods: [
              {
                foodId: 22,
                foodCount: 1,
                foodName: '모모의 픽 3',
              },
            ],
          },
        ],
      },
      {
        groupId: 93,
        groupName: '달리셔스',
        spotByDateDiningTypes: [
          {
            deliveryTime: '12:00',
            spotId: 93,
            spotName: '상경빌딩 3F',
            foods: [
              {
                foodId: 23,
                foodCount: 1,
                foodName: '모모의 픽 4',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default data;
