import {atomWithReset} from 'jotai/utils';
import {formattedWeekDate, formattedYearMonthDate} from '../dateFormatter';
export const makerNameAtom = atomWithReset();
export const pageWidthAtom = atomWithReset(window.innerWidth);

// 정산

const day = new Date();

export const startMonthAtom = atomWithReset(formattedYearMonthDate(day));
export const endMonthAtom = atomWithReset(formattedYearMonthDate(day));
export const selectClientAtom = atomWithReset([]);
export const selectStatusAtom = atomWithReset();
export const selectModifyAtom = atomWithReset();
