import { Button } from "@yamada-ui/react";
import { useSetAtom } from "jotai";
import { isCreatePinAtom } from "../../globalState.js";

const CreatePinButton = () => {
  const setIsCreatePin = useSetAtom(isCreatePinAtom);
const getAPI=async()=>{
    const responce= await axios.get()
}

  return (
    <Button
      colorScheme="lime"
      variant="solid"
      onClick={() => {
        console.log("on clicked");
        getAPI()
        setIsCreatePin(true);
      }}
    >
      ここにピンを立てる
    </Button>
  );
};

export default CreatePinButton;
