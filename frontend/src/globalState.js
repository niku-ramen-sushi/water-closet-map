import { atom } from 'jotai';
// import { pinsSampleData } from "./pinsSampleData.js";

export const pinsAtom = atom([]); // 配列にオブジェクトが入っている
export const selectedPinIdAtom = atom(null);
export const selectedPinAtom = atom([]);
export const isCreatePinAtom = atom(true);
export const isPinEditAtom = atom(false);
export const hygieneListAtom = atom([]);

export const isNewPlaceAtom = atom(false);
export const selectedTitleAtom = atom({ id: 0, title: '' });
export const selectedMyPinAtom = atom([{ id: 0 }]);
export const isNewCardAtom = atom(false);
export const latLngAtom = atom({ lat: 88.8888, lng: 99.9999 });
export const isDoAPIAtom = atom(false);
export const userIdAtom = atom(1);
