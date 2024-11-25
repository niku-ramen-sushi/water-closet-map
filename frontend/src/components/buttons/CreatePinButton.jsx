import { Button } from "@yamada-ui/react";
import { useSetAtom } from "jotai";
import { isCreatePinAtom } from "../../globalState.js";
import axios from "axios";

const CreatePinButton = () => {
  const setIsCreatePin = useSetAtom(isCreatePinAtom);
const getAPI=async()=>{
    const response= await axios.get("/api/users")
    console.log(response.data)
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
