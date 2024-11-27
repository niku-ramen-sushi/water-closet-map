import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Heading,
  HStack,
  InfiniteScrollArea,
  Input,
  NativeOption,
  NativeSelect,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack,
} from '@yamada-ui/react';
import {
  isDoAPIAtom,
  isEditDescriptionAtom,
  isNewCardAtom,
  isPinEditAtom,
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
// import { useSetAtom } from 'jotai/index.js';
// import axios from 'axios';
// import { useSetAtom } from 'jotai/index.js';
// import {useSetAtom} from "jotai/index.js";

const DisplayPosts = () => {
  const [isPinEdit, setIsPinEdit] = useAtom(isPinEditAtom);
  const [selectedPin, setSelectedPin] = useAtom(selectedPinAtom);
  const selectedTitle = useAtomValue(selectedTitleAtom);
  const isNewCard = useAtomValue(isNewCardAtom);
  const selectedMyPin = useAtomValue(selectedMyPinAtom);
  const userId = useAtomValue(userIdAtom);

  const setIsDoAPI = useSetAtom(isDoAPIAtom);
  const setIsEditDescription = useSetAtom(isEditDescriptionAtom);

  useEffect(() => {
    console.log('selectedPin', selectedPin);
  });
  const deletePost = async () => {
    const id = selectedMyPin[0].id;
    const delAdd = `/api/wc-description/${id}`;
    const delData = await axios.delete(delAdd);
    console.log('del', delData.data);
    setIsDoAPI(true);
  };

  const allPins = selectedPin.map((pin) => {
    return (
      <Card variant="elevated" key={`card_${pin.id}`} width="400px" padding="2">
        <CardHeader>
          <Heading size="md">
            {pin.comment.length === 0
              ? '（コメントなし）'
              : pin.comment.slice(0, 14)}
          </Heading>
        </CardHeader>
        <CardBody>
          <Card w="full" variant="subtle" key={`card_${pin.id}`}>
            <div>{pin.comment.length === 0 ? '　　　　　' : pin.comment}</div>
          </Card>
          <HStack>
            <div>
              {pin.type === '男性' ? '🚹' : pin.type === '女性' ? '🚺' : '🚻'}
            </div>
            <div>衛生レベル：{pin.name}</div>
          </HStack>
        </CardBody>
        {/*useridあとで変数化する⭐️*/}
        <div>{pin.username}さん</div>
        {pin.user_id === userId ? (
          <HStack justifyContent="flex-end">
            <Button
              colorScheme="warning"
              size="sm"
              onClick={() => {
                deletePost();
              }}
            >
              削除
            </Button>
            <Button
              colorScheme="primary"
              size="sm"
              onClick={() => {
                setIsPinEdit(true);
                setIsEditDescription(true);
                console.log('編集ぼたん');
                // getMyDetailData(true);
              }}
            >
              修正
            </Button>
          </HStack>
        ) : (
          ''
        )}
      </Card>
    );
  });

  return (
    <VStack w="-moz-fit-content">
      <Text fontSize="6xl">{selectedTitle.title}</Text>
      <HStack justifyContent="flex-end">
        {/*<Button>戻る</Button>*/}
        {isNewCard ? (
          <Button
            onClick={() => {
              setIsPinEdit(true);
              // getMyDetailData(false);
            }}
          >
            投稿追加
          </Button>
        ) : (
          ''
        )}
      </HStack>
      <InfiniteScrollArea>{allPins}</InfiniteScrollArea> : <></>
    </VStack>
  );
};

export default DisplayPosts;
