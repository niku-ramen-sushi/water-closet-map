// 山田UIのインポート
import {
  Button,
  Grid,
  GridItem,
  HStack,
  VStack,
  Center,
  useDisclosure,
  Text,
} from '@yamada-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
} from '@yamada-ui/react';
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@yamada-ui/react';
import {
  Dialog,
  DialogOverlay,
  DialogCloseButton,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@yamada-ui/react';

// 既存コンポーネントのインポート
import DescriptionsForm from '../forms/DescriptionsForm.jsx';
// import CreatePinForm from '../forms/CreatePinForm.jsx';
import CreatePinButton from '../buttons/CreatePinButton.jsx';

// Jotai関連のインポート
import { useAtomValue, useSetAtom } from 'jotai';
import {
  hygieneListAtom,
  isDoAPIAtom,
  isNewCardAtom,
  isNewPlaceAtom,
  isPinEditAtom,
  pinsAtom,
  selectedMyPinAtom,
  // selectedPinIdAtom,
  selectedPinAtom,
  selectedTitleAtom,
  userIdAtom,
} from '../../globalState.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAtom } from 'jotai';
// import {useAtom} from "jotai/index.js";
import axios from 'axios';
import DisplayPosts from '../forms/DisplayPosts.jsx';
import GoogleMap from '../maps/GoogleMap.jsx';

function ToiletMap() {
  const [pins, setPins] = useAtom(pinsAtom);
  const [isPinEdit, setIsPinEdit] = useAtom(isPinEditAtom);
  const setSelectedPin = useSetAtom(selectedPinAtom);
  const setHygieneList = useSetAtom(hygieneListAtom);
  const [selectedTitle, setSelectedTitle] = useAtom(selectedTitleAtom);
  const setSelectedMyPin = useSetAtom(selectedMyPinAtom);
  const setIsNewCard = useSetAtom(isNewCardAtom);
  const isNewPlace = useAtomValue(isNewPlaceAtom);
  const setPinEdit = useSetAtom(pinsAtom);
  const setIsNewPlace = useSetAtom(isNewPlaceAtom);
  const [isDoAPI, setIsDoAPI] = useAtom(isDoAPIAtom);
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const userId = useAtomValue(userIdAtom);
  const navigate = useNavigate();

  // logout
  const handleLogoutClick = async () => {
    // fetch version
    let response = await fetch(`/api/logout`);
    const data = await response.json();
    console.log('server response: ', data);
    if (response.ok) {
      navigate('/');
    }
  };

  const getAllPins = async () => {
    const resData = await axios.get('/api/all-wc-position');
    console.log('pins', resData.data);
    setPins(resData.data);
  };

  const getDetailData = async (id) => {
    const resData = await axios.get(`/api/click-wc-data/${id}`);
    console.log('all_selectedPin---', resData.data);
    setSelectedPin(resData.data);
  };

  const getMyDetailData = async (id) => {
    console.log('🚀🚀🚀🚀 path`--->> ', `/api/click-wc-data/${id}/${userId}`);
    const resData = await axios.get(`/api/click-wc-data/${id}/${userId}`); //⭐️1を変数化する
    console.log('myData:', userId, resData.data);
    if (resData.data.length !== 0) {
      setIsNewCard(false);
      setSelectedMyPin(resData.data);
    } else {
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
          user_id: userId,
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
    console.log('effect-------1');
    getAllPins();
    getHygieneList();

    if (isDoAPI) {
      console.log('effect-------2');
      getDetailData(selectedTitle.id);
      getMyDetailData(selectedTitle.id);
    }
  }, [isDoAPI]);

  function ToiletAccordion({ onOpen }) {
    return (
      <>
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
                      const obj = { id: pin.id, title: pin.title };
                      console.log('select pin;', obj);
                      setSelectedTitle(obj);
                      setIsPinEdit(false);
                      setIsNewPlace(false);
                      setDisplayDrawer(true);
                      getDetailData(pin.id);
                      getMyDetailData(pin.id);
                      console.log('🚀🚀🚀🚀 pin.id--->> ', JSON.stringify(pin));
                      onOpen();
                      // setDisplayDrawer(true);
                      console.log('一覧クリック');
                    }}
                  >
                    一覧
                  </Button>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </>
    );
  }

  function DetailDrawer({ isOpen, onClose }) {
    return (
      <div>
        <Drawer isOpen={isOpen} onClose={onClose} size="lg">
          <DrawerHeader>トイレ詳細情報</DrawerHeader>
          <DrawerBody>
            <DisplayPosts />
          </DrawerBody>
          　{/*<DrawerFooter>*/}
          {/*  <Button variant="ghost" onClick={onClose}>*/}
          {/*    とじる*/}
          {/*  </Button>*/}
          {/*</DrawerFooter>*/}
        </Drawer>
      </div>
    );
  }

  function FormDialog({ isOpen, onOpen, onClose }) {
    return (
      <>
        <Dialog
          size="lg"
          isOpen={isOpen}
          onClose={onClose}
          // header="投稿追加画面"
          // cancel="キャンセル"
          // onCancel={onClose}
          // success="投稿"
          // onSuccess={onClose}
        >
          <DescriptionsForm />
        </Dialog>
      </>
    );
  }

  function OverLapper() {
    const drawerDisclosure = useDisclosure();
    const dialogDisclosure = useDisclosure();
    // isPinEditの値が変更されたときにダイアログを開く
    // isPinEditってなんだろう
    useEffect(() => {
      console.log('-effect--isPinEdit--', isPinEdit);
      if (isPinEdit) {
        dialogDisclosure.onOpen();
      } else {
        dialogDisclosure.onClose();
      }
    }, [isPinEdit]); //[isPinEdit]);

    useEffect(() => {
      setIsDoAPI(false);

      if (displayDrawer) {
        drawerDisclosure.onOpen();
      } else {
        drawerDisclosure.onClose();
      }
    }, [displayDrawer]);

    // useEffect(() => {
    //   console.log(dialogDisclosure.onClose === true);
    //   if (!dialogDisclosure.onClose) {
    //     setIsNewPlace(false);
    //     setIsPinEdit(false);
    //   }
    // }, [dialogDisclosure.onClose]);

    // useEffect(() => {
    //   if (isPinEdit) {
    //     dialogDisclosure.onOpen();
    //   }
    // }, [isPinEdit]);

    return (
      <>
        <ToiletAccordion onOpen={drawerDisclosure.onOpen} />

        <DetailDrawer
          // isOpen={displayDrawer && !isPinEdit}
          isOpen={drawerDisclosure.isOpen && !isPinEdit}
          onClose={drawerDisclosure.onClose}
        />

        <FormDialog
          isOpen={dialogDisclosure.isOpen}
          onOpen={dialogDisclosure.onOpen}
          onClose={dialogDisclosure.onClose}
        />
      </>
    );
  }

  return (
    <Grid templateColumns="300px 1fr " gap={4}>
      {/*幅300のグリッドと、1frame?の２つのグリッドができる*/}
      <GridItem>
        <CreatePinButton />
        <OverLapper isPinEdit={isPinEdit} />
        <Center mt="md">
          <Button onClick={handleLogoutClick}>ログアウト</Button>
        </Center>
      </GridItem>

      <GridItem>
        <GoogleMap pins={pins} />
      </GridItem>
    </Grid>
  );
}

export default ToiletMap;
