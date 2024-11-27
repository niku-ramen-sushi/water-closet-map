// 山田UIのインポート
import {
  Button,
  Grid,
  GridItem,
  HStack,
  VStack,
  Center,
} from '@yamada-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
} from '@yamada-ui/react';

// 既存コンポーネントのインストール
import DescriptionsForm from '../forms/DescriptionsForm.jsx';
import CreatePinForm from '../forms/CreatePinForm.jsx';
import CreatePinButton from '../buttons/CreatePinButton.jsx';

import { useSetAtom } from 'jotai';
import {
  hygieneListAtom,
  isNewCardAtom,
  isPinEditAtom,
  pinsAtom,
  selectedMyPinAtom,
  selectedPinAtom,
  selectedTitleAtom,
} from '../../globalState.js';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import DisplayPosts from '../forms/DisplayPosts.jsx';

function ToiletMap() {
  const [pins, setPins] = useAtom(pinsAtom);

  const [isPinEdit, setIsPinEdit] = useAtom(isPinEditAtom);
  const setSelectedPin = useSetAtom(selectedPinAtom);
  const setHygieneList = useSetAtom(hygieneListAtom);
  const setSelectedTitle = useSetAtom(selectedTitleAtom);
  const setSelectedMyPin = useSetAtom(selectedMyPinAtom);
  const setIsNewCard = useSetAtom(isNewCardAtom);

  const getAllPins = async () => {
    const resData = await axios.get('/api/all-wc-position');
    console.log('pins', resData.data);
    setPins(resData.data);
  };

  const getDetailData = async (id) => {
    console.log('all ID', id);
    const resData = await axios.get(`/api/click-wc-data/${id}`);

    console.log('all--', resData.data);
    setSelectedPin(resData.data);
  };

  const getMyDetailData = async (id) => {
    console.log('my ID', id);
    const resData = await axios.get(`/api/click-wc-data/${id}/2`); //⭐️1を変数化する

    console.log('my--', resData.data);
    if (resData.data.length !== 0) {
      setIsNewCard(false);
      setSelectedMyPin(resData.data);
      console.log('myあり');
    } else {
      console.log('myなし');
      setIsNewCard(true);
      setSelectedMyPin([
        {
          address: null,
          comment: '',
          created_at: '',
          id: null,
          name: '',
          title: '',
          type: '',
          user_id: 2,
          wc_pos_id: null,
        },
      ]);
    }
  };

  //App.jsに入れたい⭐️
  const getHygieneList = async () => {
    const resData = await axios.get('/api/hygiene');
    console.log('hy:', resData.data);
    setHygieneList(resData.data);
  };

  useEffect(() => {
    getAllPins();
    getHygieneList();
  }, []);

  function ToiletAccordion() {
    return (
      <Accordion>
        {pins.map((pin) => (
          <AccordionItem key={`accordion_${pin.id}`}>
            <AccordionLabel
              onClick={() => {
                setIsPinEdit(false);
              }}
            >
              {pin.title}
            </AccordionLabel>
            <AccordionPanel>
              <HStack spacing={2} align="center">
                <Button
                  onClick={() => {
                    // setIsPinEdit(true);
                    setSelectedTitle({ id: pin.id, title: pin.title });
                    getMyDetailData(pin.id);
                  }}
                >
                  getMyDetailData
                </Button>
                <Button
                  onClick={() => {
                    // setIsPinEdit(true);
                    setSelectedTitle({ id: pin.id, title: pin.title });
                    setIsPinEdit(false);
                    console.log('クリック--------');
                    getDetailData(pin.id);
                    getMyDetailData(pin.id);
                    console.log('ここまで---------');
                  }}
                >
                  一覧
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Grid templateColumns="300px 1fr " gap={4}>
      <GridItem>
        <CreatePinButton />
        <ToiletAccordion />
      </GridItem>

      <GridItem>
        <VStack h="100%" justify="space-between">
          <div></div>
          <Center w="100%">{/*<CreatePinForm />*/}</Center>
          <Center w="100%">
            {/*<DescriptionsForm />*/}
            {isPinEdit ? <DescriptionsForm /> : <DisplayPosts />}
          </Center>
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default ToiletMap;
