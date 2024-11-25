import { Button } from "@yamada-ui/react";
import { useSetAtom } from "jotai";
import { isCreatePinAtom } from "../../globalState.js";

const CreatePinButton = () => {
  const setIsCreatePin = useSetAtom(isCreatePinAtom);

  return (
    <Button
      colorScheme="lime"
      variant="solid"
      onClick={() => {
        console.log("on clicked");
        setIsCreatePin(true);
      }}
    >
      ここにピンを立てる
    </Button>
  );
};

export default CreatePinButton;
