// sseClientModule.js

import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { getToken } from "../../Shared/localStorage";
import { useState } from "react";
import { formattedTime } from "../dateFormatter";

const REFRESH_DELAY = 500; // 1 second
let refreshTimer = null;
const baseURL =
  process.env.REACT_APP_NODE_ENV === 'prod'
    ? process.env.REACT_APP_BASE_URL + '/' + process.env.REACT_APP_API_VERSION
    : process.env.REACT_APP_NODE_ENV === 'rel' 
    ?process.env.REACT_APP_RELEASE_URL + '/' + process.env.REACT_APP_API_VERSION 
    :process.env.REACT_APP_LOCAL_URL + '/' + process.env.REACT_APP_API_VERSION;

    const EventSource = EventSourcePolyfill || NativeEventSource;
const subscribeToSSE = (onMessageCallback,eventSource, setEventSource) => {
    const token  = getToken();
    const newEventSource = new EventSource(`${baseURL}/sse/subscribe`,token && {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        heartbeatTimeout:1000*60*10
    });
    newEventSource.onopen =(event)=>{
        console.log('Connection established.');
    }
    newEventSource.onmessage = (event) => {
        if (refreshTimer) {
            clearTimeout(refreshTimer);
        }
        refreshTimer = setTimeout(() => {
            onMessageCallback(event.data);// Refresh the page
        }, REFRESH_DELAY);
    
    };
  
    newEventSource.onerror = (error) => {
      console.error('SSE 에러 '+formattedTime(new Date()), error);
      newEventSource.close();
      setEventSource(null);
    };
    setEventSource(newEventSource);

    return newEventSource;
  };
  
  export default subscribeToSSE;
  