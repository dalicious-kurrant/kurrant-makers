import styled from "styled-components";
import rightArrow from '../../../assets/icon/rightArrow.svg';
import { useState } from "react";
import DatePicker from "react-datepicker";
import { formattedDateAndDay } from "../../../utils/dateFormatter";
import { addDays ,subDays} from "date-fns";
const DeliveryCalendar =({startDate,setStartDate,setEndDate})=>{
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setStartDate(e);
        setEndDate(e)
    };
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const nextDate =()=>{
        if(startDate < addDays(new Date(),27)){
            const setDate = addDays(startDate,1);
            setStartDate(setDate);
            setEndDate(setDate);
        }
    }
    const prevDate =()=>{
        if(startDate > new Date('2023-01-01')){
            const subDay = subDays(startDate,1)
            setStartDate(subDay);
            setEndDate(subDay);
        }
    }
    return <Wrap>
        <IconBox onClick={prevDate}>
            <ArrowLeftIcon src={rightArrow}/>
        </IconBox>
        <>
        <CalenderText onClick={handleClick}>
        {formattedDateAndDay(startDate)}
        </CalenderText>
       
        </>
        <IconBox onClick={nextDate}>
            <ArrowIcon src={rightArrow}/>
        </IconBox>
        {isOpen && (
            <CalendarBox>
                <DatePicker minDate={new Date('2023-01-01')} maxDate={addDays(new Date(),28)} selected={startDate} onChange={handleChange}  inline dateFormat="Pp"/>
            </CalendarBox>
        )}
    </Wrap>
}

export default DeliveryCalendar;

const Wrap = styled.div`
    flex:1;
    padding: 9px 16px;
    display: flex;
    justify-content: space-between;
`;
const CalendarBox = styled.div`
    display: flex;
    justify-content: center;
    width: ${window.innerWidth}px;
    margin-top: 30px;
    left: -8px;
    position: absolute;
    
`
const CalenderText = styled.button`
    font-size: 16px;
    font-weight: 600;
    font-family: 'Pretendard';
    background: inherit ; 
    border:none; 
    box-shadow:none; 
    border-radius:0; 
    padding:0; 
    overflow:visible; 
    cursor:pointer;
`
const IconBox = styled.button`
    background: inherit ; 
    border:none; 
    box-shadow:none; 
    border-radius:0; 
    padding:0; 
    overflow:visible; 
    cursor:pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
`
const ArrowIcon = styled.img`
  width: 100%;
  height: 100%;
`;
const ArrowLeftIcon = styled.img`
  width: 100%;
  rotate: 180deg;
  height: 100%;
`;
