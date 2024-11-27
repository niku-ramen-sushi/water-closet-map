import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  InfiniteScrollArea,
  Input,
  NativeOption,
  NativeSelect,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from '@yamada-ui/react';
import {
  hygieneListAtom,
  isDoAPIAtom,
  isNewCardAtom,
  isNewPlaceAtom,
  isPinEditAtom,
  latLngAtom,
  selectedMyPinAtom,
  // pinsAtom,
  // selectedPinIdAtom,
  selectedPinAtom,
  selectedTitleAtom,
  userIdAtom,
} from '../../globalState.js';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import {useSetAtom} from "jotai/index.js";

const DescriptionsForm = () => {
  const selectedPin = useAtomValue(selectedPinAtom);
  const hygieneList = useAtomValue(hygieneListAtom);
  const [selectedTitle, setSelectedTitle] = useAtom(selectedTitleAtom);

  const [title, setTitle] = useState('');
  const selectedMyPin = useAtomValue(selectedMyPinAtom);
  const isNewCard = useAtomValue(isNewCardAtom);
  const [isNewPlace, setIsNewPlace] = useAtom(isNewPlaceAtom);
  // const pin = pins[selectedPinId];
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');
  const [comment, setComment] = useState('');
  const setIsPinEdit = useSetAtom(isPinEditAtom);
  const latLng = useAtomValue(latLngAtom);

  const setIsDoAPI = useSetAtom(isDoAPIAtom);
  const userId = useAtomValue(userIdAtom);

  const addData = async () => {
    const levelId = hygieneList.filter((obj) => obj.name === level)[0].id;
    console.log('postAPI:', level, levelId);
    let pinId;

    if (isNewPlace) {
      //新規場所を登録する
      const url = '/api/wc-position';
      const addObj = {
        user_id: userId,
        title,
        address: '名古屋市中村区99丁目',
        latitude: latLng.lat, //⭐️99.99999,
        longitude: latLng.lng, // ⭐️88.88888,
        created_at: new Date(),
      };
      const addPinData = await axios.post(url, addObj);
      pinId = addPinData.data[0].id;

      setSelectedTitle(addPinData.data[0]);
      console.log('newPin:', addPinData.data);
    } else {
      pinId = selectedTitle.id;
    }

    //投稿する
    const url = '/api/wc-description';
    const addObj = {
      hygiene_id: levelId,
      wc_pos_id: pinId,
      gender_type_id: Number(type),
      user_id: userId,
      comment: comment ? comment : ' ',
    };
    const resData = await axios.post(url, addObj);
    console.log('postData', resData.data);

    setLevel(null);
    setType(null);
    setComment('');
    setTitle('');

    setIsDoAPI(true);
    setIsPinEdit(false);
    setIsNewPlace(false);
    console.log('___POST END______');
  };

  const forms = selectedMyPin.map((pin) => {
    return (
      <Box
        key={`card_${pin.id}`}
        border="1px solid #ccc"
        borderRadius="8px"
        padding="4"
        width="100%"
        maxWidth="500px"
      >
        {/*<div>*/}
        {/*  確認用：{pin.id}_{pin.style}_{pin.name}_{pin.comment}*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  確認用：{type}_{level}_{comment}_{title}*/}
        {/*</div>*/}
        <VStack spacing={2} width="90%">
          <div>{isNewPlace || isNewCard ? '⭐️新規⭐️' : '✏️修正️'}</div>
          {isNewPlace ? (
            <>
              <FormControl
                isRequired
                label="トイレの場所の名前を登録してください"
                errorMessage="場所の名前は必須です"
              >
                <Input
                  placeholder="例：名古屋駅 スターバックス前"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </>
          ) : (
            <Heading as="h5" size="md" isTruncated>
              {selectedTitle.title}
            </Heading>
          )}

          <FormControl
            isRequired
            label="種類"
            errorMessage="種類の選択は必須です"
          >
            <RadioGroup
              direction="row"
              defaultValue={pin.type}
              onChange={(e) => setType(e)}
            >
              <Radio size="sm" value="1">
                男子トイレ🚹
              </Radio>
              <Radio size="sm" value="2">
                女子トイレ🚺
              </Radio>
              <Radio size="sm" value="3">
                共用トイレ🚻
              </Radio>
            </RadioGroup>
          </FormControl>

          <FormControl
            isRequired
            label="衛生レベル"
            errorMessage="衛生レベルの選択は必須です"
          >
            <NativeSelect
              placeholder="レベルを選択"
              defaultValue={pin.name}
              onChange={(e) => {
                setLevel(e.target.value);
              }}
            >
              {hygieneList.map((hygiene) => (
                <NativeOption key={`hy_${hygiene.name}`} value={hygiene.name}>
                  {hygiene.name}
                </NativeOption>
              ))}
            </NativeSelect>
          </FormControl>

          <FormControl label="詳細">
            <Textarea
              placeholder="例：綺麗な状態ですが、やや狭いです。"
              defaultValue={pin.comment}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></Textarea>
          </FormControl>
        </VStack>
      </Box>
    );
  });

  return (
    <>
      {/*{isNewPlace ? (*/}
      <VStack w="-moz-fit-content">
        <InfiniteScrollArea>{forms}</InfiniteScrollArea>
        {/*<HStack justifyContent="center">*/}
        {/*  <Button*/}
        {/*    onClick={() => {*/}
        {/*      setIsNewPlace(false);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    戻る*/}
        {/*  </Button>*/}
        <Button
          onClick={() => {
            addData();
            setIsNewPlace(false);
          }}
        >
          投稿する
        </Button>
        {/*</HStack>*/}
      </VStack>
      {/*) :  */}
      {/*)}*/}
    </>
  );
};

export default DescriptionsForm;
