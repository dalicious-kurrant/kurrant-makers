import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import { useGetMakerProductsList } from '../../hook/useProductsList';
import { PageWrapper, TableWrapper } from '../../layout/common.style';
import withCommas from '../../utils/withCommas';
import { useGetCalendarList } from '../../hook/useCalendarList';


const makersCalendar = [
  {
    "schaduleStatus" : 0 ,
    "serviceDate" : "2023-02-24",
    "diningType" : "아침",
    "makersCapa" : 100,
    "clientSchadule" : [
      {
        "pickupTime" : "07:50",
        "clientName" : "달리셔스",
        "clientCapa": 20,
        "leftMakersCapa" : 80,
        "foodSchadule" : [
          {
            "id":0,
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "id":1,
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }
        ]
      },
      {
        "pickupTime" : "07:50",
        "clientName" : "커런트",
        "clientCapa": 20,
        "leftMakersCapa" : 80,
        "foodSchadule" : [
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }
        ]
      }
    ]
  },
  {
    "schaduleStatus" : 0 ,
    "serviceDate" : "2023-02-25",
    "diningType" : "아침",
    "makersCapa" : 100,
    "clientSchadule" : [
      {
        "pickupTime" : "07:50",
        "clientName" : "달리셔스",
        "clientCapa": 20,
        "leftMakersCapa" : 80,
        "foodSchadule" : [
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }, {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },{
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }, {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }
        ]
      },
      {
        "pickupTime" : "07:50",
        "clientName" : "달리셔스",
        "clientCapa": 20,
        "leftMakersCapa" : 80,
        "foodSchadule" : [
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }
        ]
      }
    ]
  },
  {
    "schaduleStatus" : 0 ,
    "serviceDate" : "2023-02-25",
    "diningType" : "아침",
    "makersCapa" : 100,
    "clientSchadule" : [
      {
        "pickupTime" : "07:50",
        "clientName" : "달리셔스",
        "clientCapa": 20,
        "leftMakersCapa" : 80,
        "foodSchadule" : [
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }, {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }
        ]
      },
      {
        "pickupTime" : "07:50",
        "clientName" : "달리셔스",
        "clientCapa": 20,
        "leftMakersCapa" : 80,
        "foodSchadule" : [
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          },
          {
            "food": "음식",
            "foodStatus": "판매중",
            "foodCapa": 100,
            "leftFoodCapa": 20,
          }
        ]
      }
    ]
  }
]

const Calendar = () => {
  // const {data: makersCalendar} = useGetCalendarList();
  const navigate = useNavigate();
  const [count ,setCount]  = useState(0);
  const [active, setActive] = useState([]);
  const goToDetail = id => {
    navigate('/productDetail/' + id, {
      state: {
        id: id,
      },
    });
  };
  
  useEffect(()=>{
    setCount(makersCalendar.map((v,i)=>{
      let num = 0;
      v.clientSchadule.map((s,si)=>{
        s.foodSchadule.map((d,di)=>{
          num++
        })
      })
      return num;
    }))
  },[])
  return (
   
    <PageWrapper>      
      <Wrapper>
      <TitleBox>일정관리</TitleBox>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>상태</Table.HeaderCell>
              <Table.HeaderCell>날짜</Table.HeaderCell>
              <Table.HeaderCell>다이닝타입</Table.HeaderCell>
              <Table.HeaderCell>메이커스 케파</Table.HeaderCell>
              <Table.HeaderCell>픽업시간</Table.HeaderCell>
              <Table.HeaderCell>고객사</Table.HeaderCell>
              <Table.HeaderCell>고객사 케파</Table.HeaderCell>
              <Table.HeaderCell>주문가능수량</Table.HeaderCell>
              <Table.HeaderCell width={1} textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>상품</Table.HeaderCell>
              <Table.HeaderCell>음식 상태</Table.HeaderCell>
              <Table.HeaderCell>Food 케파</Table.HeaderCell>
              <Table.HeaderCell>음식별 가능 수량</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {makersCalendar.map((v,i)=>{
              return v.clientSchadule.map((s,si)=>{
                
                return s.foodSchadule.map((d,di)=>{
                  
                  const checkHandler = (id) => {
                    console.log(id)
                    if (active.findIndex((v)=>v ===id) === -1) {
                      setActive(prev => [...prev, id]);
                    } else {
                      setActive(active.filter(el => el !== id));
                    }
                    console.log(active)
                  };
                
                  return (
                    <Table.Row key={`${d.food+di}`}>
                      <Table.Cell ></Table.Cell>
                      {di=== 0 && si === 0 && <Table.Cell rowSpan={count[i]} >Unknown</Table.Cell>}
                      {di=== 0 && si === 0 && <Table.Cell rowSpan={count[i]} >{v.serviceDate}</Table.Cell>}
                      {di=== 0 && si === 0 && <Table.Cell rowSpan={count[i]} >{v.diningType}</Table.Cell>}
                      {di=== 0 && si === 0 && <Table.Cell rowSpan={count[i]} >{v.makersCapa}</Table.Cell>}
                      {di=== 0 && <Table.Cell rowSpan={s.foodSchadule.length}>{s.pickupTime}</Table.Cell>}
                      {di=== 0 && <Table.Cell rowSpan={s.foodSchadule.length}>{s.clientName}</Table.Cell>}
                      {di=== 0 && <Table.Cell rowSpan={s.foodSchadule.length}>{s.clientCapa}</Table.Cell>}
                      {di=== 0 && <Table.Cell rowSpan={s.foodSchadule.length}>{s.leftMakersCapa}</Table.Cell>}
                      <Table.Cell textAlign="center">
                        <Button toggle active={!active.find((v)=>v === i+""+si+""+di)} onClick={()=>checkHandler(i+""+si+""+di)}>
                          {active.find((v)=>v === i+""+si+""+di) ? "거절": "승인"}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{d.food}</Table.Cell>
                      <Table.Cell>{d.foodStatus}</Table.Cell>
                      <Table.Cell>{d.foodCapa}</Table.Cell>
                      <Table.Cell>{d.leftFoodCapa}</Table.Cell>
                    </Table.Row>
                  )
                })
              })
            })}
            
          </Table.Body>
        </Table>
      </TableWrapper>
      </Wrapper>
    </PageWrapper>
   
  );
};

export default Calendar;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
`
const TitleBox  = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 20px;
`
