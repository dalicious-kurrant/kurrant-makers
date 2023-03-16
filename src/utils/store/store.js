import {atomWithReset} from 'jotai/utils';

export const makerNameAtom = atomWithReset();
export const pageWidthAtom = atomWithReset(window.innerWidth);
