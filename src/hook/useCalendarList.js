import { useMutation, useQuery } from 'react-query';
import { calendarApis } from '../api/calendar';

export function useGetCalendarList() {
    return useQuery('calendar', () => {
        return calendarApis.getCalendarList();
    });
}