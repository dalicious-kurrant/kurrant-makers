import React, { useState } from "react";
import styled, { css } from "styled-components";

const Component = ({id,status,data,setData})=>{
    const setStatus = (sta)=>{
        setData(data.map((makers)=>{
            if(makers.presetMakersId === id){
                return {...makers,scheduleStatus:sta,clientSchedule:makers.clientSchedule.map((client)=>{
                    return {...client,foodSchedule:client.foodSchedule.map((food)=>{
                        return {...food,scheduleStatus:sta}
                    })}
                })}
            }else{
                return makers;
            }
        }))
    }
    return(
        <SwitchContainer>
            <SwitchBlock 
                status={status} 
                onClick={()=>{
                    setStatus(1);
                }}>{status === 0? "":status===1 ? "승":""}</SwitchBlock>
            <SwitchBlock2 
                status={status} 
                onClick={()=>{
                    if(status===0 ){
                        setStatus(1);
                    }
                    if(status === 2 ||status === 1){
                        setStatus(0);
                    }
                }}>{status === 0? "대":status===1 ? "인":""}</SwitchBlock2>
            <SwitchBlock3 
                status={status} 
                onClick={()=>{
                    if(status===0){
                        setStatus(2);
                    }
                    if(status === 1 || status === 2){
                        setStatus(0);
                    }
            
                }}>{status === 0? "기":status===1 ? "":"거"}</SwitchBlock3>
            <SwitchBlock4
                status={status} 
                onClick={()=>{
                    setStatus(2);
                }}>{status === 0? "":status===1 ? "":"절"}</SwitchBlock4>
        </SwitchContainer>
    )

}

export default Component;


const SwitchContainer = styled.div`
    display: flex;
    width: 100px;
    height: 35px;
    border: 1px solid grey;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
`
const SwitchBlock = styled.div`
    background-color :  ${({status})=>status === 0? "white":status===1 ? "#20BA45":"white"};
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
    
`

const SwitchBlock2 = styled.div`
    background-color :  ${({status})=>status === 0? "grey":status===1 ? "#20BA45":"white"};
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
`
const SwitchBlock3 = styled.div`
    background-color :  ${({status})=>status === 0? "grey":status===1 ? "white":"#DB2828"};
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
`
const SwitchBlock4 = styled.div`

    background-color :  ${({status})=>status === 0? "white":status===1 ? "white":"#DB2828"};
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
    
`