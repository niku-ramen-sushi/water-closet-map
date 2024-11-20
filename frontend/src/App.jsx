import { Center, UIProvider } from "@yamada-ui/react";
import DescriptionsForm from "./components/forms/DescriptionsForm.jsx";
import "./App.css";

function App() {
  return (
    <UIProvider>
      <Center border="1px">
        <DescriptionsForm />
      </Center>
    </UIProvider>
  );
}

export default App;
