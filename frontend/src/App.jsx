import { Button, HStack, UIProvider, VStack } from "@yamada-ui/react";
import DescriptionsForm from "./components/forms/DescriptionsForm.jsx";
import CreatePinForm from "./components/forms/CreatePinForm.jsx";
import CreatePinButton from "./components/buttons/CreatePinButton.jsx";
import { MapPin } from "@yamada-ui/lucide";
import { useAtomValue, useSetAtom } from "jotai";
import { isPinEditAtom, pinsAtom, selectedPinIdAtom } from "./globalState.js";

function App() {
  const pins = useAtomValue(pinsAtom);
  const setIsPinEdit = useSetAtom(isPinEditAtom);
  const setSelectedPinId = useSetAtom(selectedPinIdAtom);

  return (
    <UIProvider>
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
    </UIProvider>
  );
}

export default App;
