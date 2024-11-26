import { Button, HStack, VStack } from '@yamada-ui/react';
import DescriptionsForm from '../forms/DescriptionsForm.jsx';
import CreatePinForm from '../forms/CreatePinForm.jsx';
import CreatePinButton from '../buttons/CreatePinButton.jsx';
import { MapPin } from '@yamada-ui/lucide';
import {  useSetAtom } from 'jotai';
import {
    hygieneListAtom,
    isPinEditAtom,
    pinsAtom,
    // selectedPinIdAtom,
    selectedPinAtom,
} from '../../globalState.js';
import {useEffect} from "react";
import {useAtom} from "jotai";
// import {useAtom} from "jotai/index.js";
import axios from "axios";

function ToiletMap() {
    const [pins, setPins] = useAtom(pinsAtom);

  const setIsPinEdit = useSetAtom(isPinEditAtom);
  // const  setSelectedPinId = useSetAtom(selectedPinIdAtom);
  const setSelectedPin = useSetAtom(selectedPinAtom);
  const setHygieneList=useSetAtom(hygieneListAtom)

  const getAllPins=async()=>{
        const resData= await axios.get("/api/all-wc-position")
        console.log("pins",resData.data)
        setPins(resData.data)
    }

    const getDetailData=async(id)=>{
        const resData= await axios.get(`/api/click-wc-data/${id}`)
        console.log(resData.data)
        setSelectedPin(resData.data)
    }

    const getMyDetailData=async(id)=>{
        const resData= await axios.get(`/api/click-wc-data/${id}/2`)//⭐️1を変数化する
        console.log(resData.data)
        const res = resData.data.length !== 0 ? resData.data :
            [{address:null, comment: "", created_at : "",
            id : null, name :"", title : "",type : "",user_id:2,  wc_pos_id:null }]
        setSelectedPin(res)
    }

    //App.jsに入れたい⭐️
    const getHygieneList=async()=>{
        const resData= await axios.get("/api/hygiene")
        console.log('hy:',resData.data)
        setHygieneList(resData.data)
    }

  useEffect(()=>{
    getAllPins()
    getHygieneList()

  },[])


  return (
    <VStack spacing={2} align="center">
      <CreatePinButton />
      {pins.map((pin) => {
        return (
          <HStack spacing={2} align="center" key={`title_${pin.id}`}>
            <MapPin />
            <Button
              onClick={() => {
                setIsPinEdit(true);
                // setSelectedPinId(i);
                  getMyDetailData(pin.id)
              }}
            >
              {pin.title}
            </Button>
              <Button
                  onClick={() => {
                      setIsPinEdit(true);
                      // setSelectedPinId(i);
                      getDetailData(pin.id)
                  }}
              >
                  一覧
              </Button>
          </HStack>
        );
      })}
      <CreatePinForm />
      <DescriptionsForm />
    </VStack>
  );
}

export default ToiletMap;
