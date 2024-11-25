import { Button, HStack, VStack } from '@yamada-ui/react';
import DescriptionsForm from '../forms/DescriptionsForm.jsx';
import CreatePinForm from '../forms/CreatePinForm.jsx';
import CreatePinButton from '../buttons/CreatePinButton.jsx';
import { MapPin } from '@yamada-ui/lucide';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  isPinEditAtom,
  pinsAtom,
  selectedPinIdAtom,
} from '../../globalState.js';

function ToiletMap() {
  const pins = useAtomValue(pinsAtom);
  const setIsPinEdit = useSetAtom(isPinEditAtom);
  const setSelectedPinId = useSetAtom(selectedPinIdAtom);

  return (
    <VStack spacing={2} align="center">
      <CreatePinButton />
      {pins.map((pin, i) => {
        return (
          <HStack spacing={2} align="center" key={i}>
            <MapPin />
            <Button
              onClick={() => {
                setIsPinEdit(true);
                setSelectedPinId(i);
              }}
            >
              {pin.title}
            </Button>
          </HStack>
        );
      })}
      <CreatePinForm />
      <DescriptionsForm />
    </VStack>
  );
}

export default ToiletMap;
