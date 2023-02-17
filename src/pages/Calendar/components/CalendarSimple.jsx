import {Button, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from '../../../layout/common.style';
import ThirdSwitch from '../../../component/ThirdSwitch'
import styled from 'styled-components';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import { formattedWeekDate } from '../../../utils/dateFormatter';
import { addDays, eachWeekOfInterval, subDays,eachDayOfInterval} from 'date-fns';

const CalendarSimple = ({testData,setTestData}) => {
    const format = "yyyy-mm-dd";
    const dates = eachWeekOfInterval(
        {
         start: subDays(new Date(moment(testData[0].serviceDate).startOf("week").toLocaleString()), 0), // 지난주
         end: addDays(new Date(), 21), // 다음주
        },
        {
         weekStartsOn:0, // 일요일부터 시작
        }
    ).reduce((acc,cur) =>{
        const allDays = eachDayOfInterval({
            start: cur,
            end: addDays(cur,6)
        });
        acc.push(allDays);
        return acc;
    },[]);
    
    console.log(dates)
    return(
        <>
      
                <TableWrapper>
                    <Table celled>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>월</Table.HeaderCell>
                        <Table.HeaderCell>화</Table.HeaderCell>
                        <Table.HeaderCell>수</Table.HeaderCell>
                        <Table.HeaderCell>목</Table.HeaderCell>
                        <Table.HeaderCell>금</Table.HeaderCell>
                        <Table.HeaderCell>토</Table.HeaderCell>
                        <Table.HeaderCell>일</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                        {testData.map((s, i) => {
                            const mondayDate = moment(s.serviceDate).startOf("week").toLocaleString();
                            return (
                                <Table.Cell key={s.presetMakersId}>
                                    {formattedWeekDate(mondayDate)}
                                </Table.Cell>                   
                            
                            );
                        })}
                        </Table.Row>
                    </Table.Body>
                    </Table>
                </TableWrapper>
         
      </>
    )

}

export default CalendarSimple;

