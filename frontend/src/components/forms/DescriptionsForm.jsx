import {
  Box,
  FormControl,
  Heading,
  NativeOption,
  NativeSelect,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from "@yamada-ui/react";
import {
  isPinEditAtom,
  pinsAtom,
  selectedPinIdAtom,
} from "../../globalState.js";
import { useAtomValue } from "jotai";

const DescriptionsForm = () => {
  const isPinEdit = useAtomValue(isPinEditAtom);
  const pins = useAtomValue(pinsAtom);
  const selectedPinId = useAtomValue(selectedPinIdAtom);

  const pin = pins[selectedPinId];

  return isPinEdit ? (
    <Box
      border="1px solid #ccc"
      borderRadius="8px"
      padding="4"
      width="100%"
      maxWidth="500px"
    >
      <VStack spacing={2} width="80%">
        <Heading as="h5" size="md" isTruncated>
          {pin.title}
        </Heading>

        <FormControl
          isRequired
          label="種類"
          errorMessage="種類の選択は必須です"
        >
          <RadioGroup direction="row" defaultValue={pin.category}>
            <Radio size="sm" value="男子トイレ">
              男子トイレ🚹
            </Radio>
            <Radio size="sm" value="女子トイレ">
              女子トイレ🚺
            </Radio>
            <Radio size="sm" value="共用トイレ">
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
            defaultValue={pin.hygieneLevel}
          >
            <NativeOption value="5">かなり綺麗</NativeOption>
            <NativeOption value="4">綺麗</NativeOption>
            <NativeOption value="3">普通</NativeOption>
            <NativeOption value="2">汚い</NativeOption>
            <NativeOption value="1">かなり汚い</NativeOption>
          </NativeSelect>
        </FormControl>

        <FormControl label="詳細">
          <Textarea
            placeholder="例：綺麗な状態ですが、やや狭いです。"
            defaultValue={pin.description}
          ></Textarea>
        </FormControl>
      </VStack>
    </Box>
  ) : (
    <></>
  );
};

export default DescriptionsForm;
