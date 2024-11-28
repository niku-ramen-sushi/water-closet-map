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
export const latLngAtom = atom({ lat: 35.1698072, lng: 136.885171621167 });
export const isDoAPIAtom = atom(false);
export const userIdAtom = atom(0);
export const isEditDescriptionAtom = atom(false);
