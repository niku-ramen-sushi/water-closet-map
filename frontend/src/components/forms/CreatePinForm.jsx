import { Box, Button, FormControl, Input, VStack } from "@yamada-ui/react";
import { isCreatePinAtom, pinsAtom } from "../../globalState.js";
import { useAtom } from "jotai";
import { useState } from "react";

const CreatePinForm = () => {
  const [isCreatePin, setIsCreatePin] = useAtom(isCreatePinAtom);
  const [pins, setPins] = useAtom(pinsAtom);
  const [inputValue, setInputValue] = useState("");

  return isCreatePin ? (
    <Box
      border="1px solid #ccc"
      borderRadius="8px"
      padding="4"
      width="100%"
      maxWidth="500px"
    >
      <VStack spacing={2} align="center">
        <FormControl
          isRequired
          label="名前を登録してください"
          errorMessage="場所の名前は必須です"
        >
          <Input
            placeholder="例：名古屋駅 スターバックス前"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </FormControl>

        {inputValue.length > 0 ? (
          <Button
            width="80px"
            colorScheme="primary"
            variant="solid"
            onClick={() => {
              console.log("on clicked");
              setIsCreatePin(false);
              // ここでピンデータを追加したい。今はステートで代用
              setPins([...pins, { title: inputValue }]);
            }}
          >
            完了 ✔︎
          </Button>
        ) : (
          <></>
        )}
      </VStack>
    </Box>
  ) : (
    <></>
  );
};

export default CreatePinForm;
