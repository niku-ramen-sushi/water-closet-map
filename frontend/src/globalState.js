import { atom } from "jotai";
// import { pinsSampleData } from "./pinsSampleData.js";

export const pinsAtom = atom([]); // 配列にオブジェクトが入っている
export const selectedPinIdAtom = atom(null);
export const selectedPinAtom = atom([]);
export const isCreatePinAtom = atom(false);
export const isPinEditAtom = atom(false);
export const hygieneListAtom=atom([])

