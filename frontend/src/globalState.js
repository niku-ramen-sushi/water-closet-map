import { atom } from "jotai";
import { pinsSampleData } from "./pinsSampleData.js";

export const pinsAtom = atom(pinsSampleData); // 配列にオブジェクトが入っている
export const selectedPinIdAtom = atom(null);
export const isCreatePinAtom = atom(false);
export const isPinEditAtom = atom(false);
