import { UIProvider, VStack } from "@yamada-ui/react";
import DescriptionsForm from "./components/forms/DescriptionsForm.jsx";
import CreatePinForm from "./components/forms/CreatePinForm.jsx";

function App() {
  return (
    <UIProvider>
      <VStack spacing={2} align="center">
        <CreatePinForm />
        <DescriptionsForm />
      </VStack>
    </UIProvider>
  );
}

export default App;
