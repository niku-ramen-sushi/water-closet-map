import { Button } from '@yamada-ui/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  isCreatePinAtom,
  isNewPlaceAtom,
  isPinEditAtom,
} from '../../globalState.js';
import axios from 'axios';

const CreatePinButton = () => {
  const setIsCreatePin = useSetAtom(isCreatePinAtom);
  // const setIsNewPlace = useSetAtom(isNewPlaceAtom);
  const [isNewPlace, setIsNewPlace] = useAtom(isNewPlaceAtom);
  const setisPinEdit = useSetAtom(isPinEditAtom);

  // const getAPI = async () => {
  //   const response = await axios.get('/api/users');
  //   console.log(response.data);
  // };

  return (
    <Button
      colorScheme="lime"
      variant="solid"
      onClick={() => {
        console.log('be_on clicked', isNewPlace);
        // getAPI();
        setIsCreatePin(true);
        setIsNewPlace(true);
        setisPinEdit(true);
      }}
    >
      新規トイレ登録
    </Button>
  );
};

export default CreatePinButton;
