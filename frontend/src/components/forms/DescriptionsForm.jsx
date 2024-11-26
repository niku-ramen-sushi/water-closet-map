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
  hygieneListAtom,
  isPinEditAtom,
  // pinsAtom,
  // selectedPinIdAtom,
  selectedPinAtom,
} from "../../globalState.js";
import { useAtomValue} from "jotai";
// import {useSetAtom} from "jotai/index.js";

const DescriptionsForm = () => {
  const isPinEdit = useAtomValue(isPinEditAtom);
  // const pins = useAtomValue(pinsAtom);
  // const selectedPinId = useAtomValue(selectedPinIdAtom);
  const selectedPin = useAtomValue(selectedPinAtom);
  const hygieneList = useAtomValue(hygieneListAtom)


  // const pin = pins[selectedPinId];



  return isPinEdit ? (
      selectedPin.map((pin)=> {
        return (
            <Box key={`card_${pin.id}`}
                 border="1px solid #ccc"
                 borderRadius="8px"
                 padding="4"
                 width="100%"
                 maxWidth="500px"
            >
              <VStack spacing={2} width="80%">
                <Heading as="h5" size="md" isTruncated>
                  {pin.title} {pin.id ?"":"⭐️新規⭐️"}
                </Heading>

                <FormControl
                    isRequired
                    label="種類"
                    errorMessage="種類の選択は必須です"
                >
                  <RadioGroup direction="row" defaultValue={pin.type} >
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

                  <NativeSelect
                      placeholder="レベルを選択"
                      defaultValue={pin.name}
                  >
                    {hygieneList.map((hygiene)=>
                        <NativeOption key={`hy_${hygiene.name}`} value={hygiene.name}>{hygiene.name}</NativeOption>

                    )}
                    {/*<NativeOption value="5">かなり綺麗</NativeOption>*/}
                    {/*<NativeOption value="4">綺麗</NativeOption>*/}
                    {/*<NativeOption value="3">普通</NativeOption>*/}
                    {/*<NativeOption value="2">汚い</NativeOption>*/}
                    {/*<NativeOption value="1">かなり汚い</NativeOption>*/}

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
        )}
      )
  ) : (
      <></>
  );
};

export default DescriptionsForm;
