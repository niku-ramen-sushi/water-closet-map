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
  isNewCardAtom,
  isNewPlaceAtom,
  isPinEditAtom,
  selectedMyPinAtom,
  // pinsAtom,
  // selectedPinIdAtom,
  selectedPinAtom,
  selectedTitleAtom,
} from '../../globalState.js';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
// import {useSetAtom} from "jotai/index.js";

const DescriptionsForm = () => {
  const isPinEdit = useAtomValue(isPinEditAtom);
  // const pins = useAtomValue(pinsAtom);
  // const selectedPinId = useAtomValue(selectedPinIdAtom);
  const selectedPin = useAtomValue(selectedPinAtom);
  const hygieneList = useAtomValue(hygieneListAtom);
  const isNewPlace = useAtomValue(isNewPlaceAtom); //場所をNewしたかどうか⭐️
  const selectedTitle = useAtomValue(selectedTitleAtom);
  const [inputTitle, setInputTitle] = useState('');
  const selectedMyPin = useAtomValue(selectedMyPinAtom);
  const isNewCard = useAtomValue(isNewCardAtom);
  // const pin = pins[selectedPinId];

  useEffect(() => {
    console.log('selectedPin', selectedPin);
  });

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
        <div>
          確認用：{pin.id}_{pin.style}_{pin.name}_{pin.comment}
        </div>
        <VStack spacing={2} width="80%">
          <div>{isNewCard ? '⭐️新規⭐️' : '✏️修正️'}</div>
          {isNewPlace ? (
            <>
              <FormControl
                isRequired
                label="名前を登録してください"
                errorMessage="場所の名前は必須です"
              >
                <Input
                  placeholder="例：名古屋駅 スターバックス前"
                  onChange={(e) => setInputTitle(e.target.value)}
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
            <RadioGroup direction="row" defaultValue={pin.type}>
              <Radio size="sm" value="男性">
                男子トイレ🚹
              </Radio>
              <Radio size="sm" value="女性">
                女子トイレ🚺
              </Radio>
              <Radio size="sm" value="共用">
                共用トイレ🚻
              </Radio>
            </RadioGroup>
          </FormControl>

          <FormControl
            isRequired
            label="衛生レベル"
            errorMessage="衛生レベルの選択は必須です"
          >
            <NativeSelect placeholder="レベルを選択" defaultValue={pin.name}>
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
            ></Textarea>
          </FormControl>
        </VStack>
      </Box>
    );
  });

  return (
    <>
      <VStack w="-moz-fit-content">
        <InfiniteScrollArea>{forms}</InfiniteScrollArea>
        <HStack justifyContent="center">
          <Button>戻る</Button>
          <Button>投稿する</Button>
        </HStack>
      </VStack>
    </>
  );
};

export default DescriptionsForm;
